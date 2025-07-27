import classNames from 'classnames/bind'
import Section from '../shared/Section'
import Styles from './Map.module.scss'
import { useEffect, useRef } from 'react'
import { Location } from '@/models/wedding'
declare global{
    interface Window {
        kakao:any
    }
}

const cx = classNames.bind(Styles)

function Map({location}: {location: Location}){
    const mapContainer = useRef(null)

    useEffect(()=>{
        //console.log('mapContainer.current:', mapContainer.current);

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&autoload=false`
        script.async = true

        document.head.appendChild(script)

        script.onload = () =>{
            window.kakao.maps.load(()=>{
                const position = new window.kakao.maps.LatLng(location.lat, location.lng)
                const options = {
                    center: position,
                    level:3
                }

                const marker = new window.kakao.maps.Marker({
                    position
                })
                const map =  new window.kakao.maps.Map(mapContainer.current, options)
                marker.setMap(map)
            })
        }
    },[location])
    return (
        <Section title={(
            <div className={cx('wrap-header')}>
                <span className={cx('txt-title')}>오시는 길</span>
                <span className={cx('txt-subtitle')}>{location.name}</span>
                <span className={cx('txt-address')}>{location.address}</span>
            </div>
        )}>
            <div className={cx('wrap-map')}>
                <div className={cx('map')} ref={mapContainer}></div>
                <div className={cx('map-overlay')}>
                    <a className={cx('btn-find-way')} href={location.link} target='_blank' rel='noreferrer'>
                        <span className={cx('btn-icon')}>🗺️</span>
                        길찾기
                    </a>
                </div>
            </div>

            <div className={cx('wrap-transport')}>
                <div className={cx('transport-section')}>
                    <WayToCome 
                        label={
                            <div className={cx('transport-label')}>
                                <span className={cx('transport-icon')}>🚌</span>
                                <span>버스 이용시</span>
                            </div>
                        } 
                        list={location.waytocome.bus} 
                    />
                </div>
                
                <div className={cx('transport-section')}>
                    <WayToCome 
                        label={
                            <div className={cx('transport-label')}>
                                <span className={cx('transport-icon')}>🚉</span>
                                <span>지하철 이용시</span>
                            </div>
                        } 
                        list={location.waytocome.metro} 
                    />
                </div>
            </div>
        </Section>
        )
}

function WayToCome({label, list}:{label:React.ReactNode; list:string[]}){
    return (
        <div className={cx('wrap-waytocome')}>
            <div className={cx('txt-label')}>{label}</div>
            <ul>
                {list.map((waytocome)=>(
                    <li>{waytocome}</li>
                ))}
            </ul>
        </div>
    )
}

export default Map