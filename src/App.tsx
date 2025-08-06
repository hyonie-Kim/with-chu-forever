import { useEffect, useState } from 'react'

import classNames from 'classnames/bind'

import styles from './App.module.scss'

import FullScreenMessage from './components/shared/FullScreenMessage'

import Heading from './components/sections/Heading'
import Video from './components/sections/Video'
import ImagesGallery from './components/sections/ImagesGallery'

import {Wedding} from '@models/wedding'
import Intro from './components/sections/Intro'
import Invitaion from './components/sections/Invitaion'
import Calendar from './components/sections/Calendar'
import Map from './components/sections/Map'
import Contact from './components/sections/Contact'
import Share from './components/sections/Share'
import AttendCountModal from './components/AttendCountModal'

const cx = classNames.bind(styles)

function App() {
  const [wedding, setWedding] = useState<Wedding|null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // 1. 웨딩 데이터 호출
  useEffect(()=>{
    setLoading(true);
    setError(false);
    
    const apiUrl = import.meta.env.MODE === 'development' 
      ? 'http://localhost:8888/wedding'
      : 'https://with-chu-forever-1.onrender.com/wedding';
    
    console.log('현재 환경:', import.meta.env.MODE);
    console.log('API URL:', apiUrl);
    
    // 캐시된 데이터 확인 (1시간 유효)
    const cachedData = localStorage.getItem('wedding-data');
    const cacheTime = localStorage.getItem('wedding-cache-time');
    const now = Date.now();
    const cacheAge = cacheTime ? now - parseInt(cacheTime) : 0;
    const cacheValid = cacheAge < 60 * 60 * 1000; // 1시간
    
    if (cachedData && cacheValid) {
      try {
        const parsedData = JSON.parse(cachedData);
        console.log('캐시된 데이터 사용');
        setWedding(parsedData);
        setLoading(false);
        return;
      } catch (e) {
        console.log('캐시 데이터 파싱 실패');
        localStorage.removeItem('wedding-data');
        localStorage.removeItem('wedding-cache-time');
      }
    }
    
    // 타임아웃 설정 (30초)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    fetch(apiUrl, {
      signal: controller.signal,
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    }).then((res)=>{
      clearTimeout(timeoutId);
      
      if(res.ok === false){
        throw new Error(`HTTP ${res.status}: 청첩장 정보를 불러오지 못했습니다.`);
      }
      return res.json();
    }).then((data) => {
      console.log('데이터 로드 성공:', data);
      setWedding(data);
      
      // 캐시에 저장
      localStorage.setItem('wedding-data', JSON.stringify(data));
      localStorage.setItem('wedding-cache-time', now.toString());
      
    }).catch((e)=>{
      clearTimeout(timeoutId);
      console.log("에러발생", e);
      
      if (e.name === 'AbortError') {
        console.log('요청 시간 초과 (30초)');
      }
      
      setError(true);
    }).finally(() =>{
      setLoading(false);
    })
  },[])

  if(loading){
    return <FullScreenMessage type='loading'></FullScreenMessage> 
  }

  if(error){
    return <FullScreenMessage type='error'></FullScreenMessage> 
  }

  if(wedding == null){
    return null
  }
  
  const {date, galleryImages, groom, bride, location, message:{intro,invitation}} = wedding;

  return (
    <>
      <div className={cx('container')}>
        <Heading date={date}/>
        <Video/>
        <Intro groomName={groom.name} brideName={bride.name} location={location.name} date={date} message={intro}/>
        <Invitaion message={invitation}/>
        <ImagesGallery images={galleryImages}/>
        <Calendar date={date}/>
        <Map location={location}/>
        <Contact groom={groom} bride={bride}/>
        <Share groomName={groom.name} brideName={bride.name} date={date}/>

        <AttendCountModal wedding={wedding}/>
      </div>
    </>
  )
}

export default App
