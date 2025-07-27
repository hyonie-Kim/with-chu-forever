import { Swiper, SwiperSlide } from 'swiper/react'
import classNames from 'classnames/bind'

import './swiper.css'

import styles from './ImageViewer.module.scss'
import Dimmed from '../shared/Dimmed';
import { useEffect, useRef } from 'react';

const cx = classNames.bind(styles)

function ImageViewer({
    images,
    open = false, 
    selectedIdx,
    onClose
    }:{
        images:string[]; 
        open:boolean;
        selectedIdx:number;
        onClose: () => void;
    }){
    const swiperRef = useRef<any>(null)
    
    useEffect(()=>{
        if(swiperRef.current && open){
            console.log('useEffect - 현재 활성 인덱스:', swiperRef.current.activeIndex)
            console.log('useEffect - 선택된 이미지:', images[selectedIdx])
        }
    },[selectedIdx,open])

    console.log('ImageViewer 렌더링 - open:', open, 'selectedIdx:', selectedIdx)
    console.log('ImageViewer 렌더링 - 선택된 이미지:', images[selectedIdx])
    
    if(open === false || selectedIdx < 0 || selectedIdx >= images.length){
        return null
    }

    return(
        <Dimmed>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <CloseBtn className={cx('icon-close')} onClose={onClose}/>
                                            <Swiper
                key={`swiper-${selectedIdx}`}
                onSwiper={(swiper)=>{
                console.log('onSwiper - selectedIdx:', selectedIdx)
                console.log('onSwiper - 선택된 이미지:', images[selectedIdx])
                console.log('onSwiper - 전체 이미지 배열:', images)
                swiperRef.current = swiper;
                }}
                slidesPerView={1} 
                loop={false} 
                spaceBetween={0}
                initialSlide={selectedIdx}
                allowTouchMove={true}
                >
                                        {images.map((src, idx)=>{ 
                            return  (
                            <SwiperSlide key={idx}>
                                <img 
                                    src={`${src}.jpeg`} 
                                    alt={`웨딩 이미지 ${idx}`} 
                                    onLoad={() => console.log(`이미지 로드 성공: ${src}.webp (인덱스: ${idx})`)}
                                    onError={(e) => console.error(`이미지 로드 실패: ${src}.webp`, e)}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100vh',
                                        objectFit: 'contain',
                                        display: 'block'
                                    }}
                                    data-index={idx}
                                />
                            </SwiperSlide>)})
                    }
                   
                </Swiper>
            </div>
        </Dimmed>
    )
}

function CloseBtn({onClose, className}: {onClose: ()=> void; className: string}){
    return(
    <svg 
    className={className}
    height="24" 
    viewBox="0 0 24 24" 
    width="24" 
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClose}
    >
        <path d="M16.3394 9.32245C16.7434 8.94589 16.7657 8.31312 16.3891 7.90911C16.0126 7.50509 15.3798 7.48283 14.9758 7.85938L12.0497 10.5866L9.32245 7.66048C8.94589 7.25647 8.31312 7.23421 7.90911 7.61076C7.50509 7.98731 7.48283 8.62008 7.85938 9.0241L10.5866 11.9502L7.66048 14.6775C7.25647 15.054 7.23421 15.6868 7.61076 16.0908C7.98731 16.4948 8.62008 16.5171 9.0241 16.1405L11.9502 13.4133L14.6775 16.3394C15.054 16.7434 15.6868 16.7657 16.0908 16.3891C16.4948 16.0126 16.5171 15.3798 16.1405 14.9758L13.4133 12.0497L16.3394 9.32245Z" /><path clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"  fillRule="evenodd"/>
    </svg>
    )
}

export default ImageViewer