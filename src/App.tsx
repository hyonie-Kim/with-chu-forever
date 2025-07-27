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
      const apiUrl = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8888/wedding'
        : 'https://with-chu-forever-1.onrender.com/wedding';
      
      console.log('현재 환경:', import.meta.env.MODE);
      console.log('API URL:', apiUrl);
      
      fetch(apiUrl).then((res)=>{
      
        if(res.ok === false){
          throw new Error('청첩장 정보를 불러오지 못했습니다.');
        }
        return res.json();
      }).then((data) => {
        setWedding(data);
        
      }).catch((e)=>{
        console.log("에러발생",e);
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
      //<div>Error...</div>
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
