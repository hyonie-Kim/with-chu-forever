import classNames from 'classnames/bind';
import Section from '../shared/Section';
import styles from './Share.module.scss'
import { useEffect } from 'react';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { CopyToClipboard } from 'react-copy-to-clipboard';

declare global {
    interface Window{
        Kakao: any
    }
}

const CopyToClipboardComponent = CopyToClipboard as any;

interface ShareProps {
    groomName: string;
    brideName: string;
    date: string;
}
const cx = classNames.bind(styles);

function Share({groomName, brideName,date}:ShareProps){
    useEffect(()=>{
        const script = document.createElement('script')
        script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js'
        script.async = true

        document.head.appendChild(script)

        script.onload = () => {
            if(!window.Kakao.isInitialized()){
                window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY);
               
            }
            
        }
    },[])

    const handleSgareKakao = () => {
        window.Kakao.Share.sendDefault({
            objectType:'feed',
            content: {
                title: `${groomName} ❤️ ${brideName} 결혼합니다.`,
                description:`${format(parseISO(date), 'M월 d일 eeee aaa h시', {locale:ko})}`,
                imageUrl:`https://res.cloudinary.com/dtzps6hve/image/upload/v1753010068/webp/chu_wedding_day_ygcxab.webp`,
                link:{
                    mobileWebUrl:window.location.origin,
                    webUrl:window.location.origin
                }
            },
            buttons:[
                {title:'청첩장 보기',
                    link:{
                        mobileWebUrl:window.location.origin,
                        webUrl:window.location.origin
                    }
                },
                
            ]
            
        })
    }
    console.log(window);
    return (
        <Section title='공유하기'>
            <div className={cx('wrap-share')}>
                <button onClick={handleSgareKakao}>
                    <IconKakao/>
                </button>
                <CopyToClipboardComponent text={window.location.origin} 
                onCopy={()=>{
                    alert('복사가 완료되었습니다.')
                }}
                >
                <button >
                    <IconClipboard/>
                </button>
                </CopyToClipboardComponent>
            </div>
        </Section>
    )
}

function IconKakao(){
    return(
        <svg data-name="Social Media Icons" id="Social_Media_Icons" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g data-name="Kakao Talk" id="Kakao_Talk">
                <path fill="#411c1d" d="M512,224.31c0,112-114.6,202.75-256,202.75a321.35,321.35,0,0,1-41.63-2.69,9.05,9.05,0,0,0-6.16,1.41l-96,63.14a9.07,9.07,0,0,1-13.81-9.66l18.23-77.14a9,9,0,0,0-4.46-10C44.49,355.6,0,294.06,0,224.31c0-112,114.62-202.75,256-202.75S512,112.33,512,224.31Z"/>
                <path fill="#fff200" d="M163.9,174.58A13.6,13.6,0,0,0,150.3,161H81.24a13.6,13.6,0,1,0,0,27.2h20.93v87.49a13.6,13.6,0,0,0,27.2,0V188.18H150.3A13.6,13.6,0,0,0,163.9,174.58Z"/>
                <path fill="#fff200" d="M324.89,262.36H297.31V174.58a13.6,13.6,0,0,0-27.2,0V276a13.6,13.6,0,0,0,13.6,13.6h41.18a13.6,13.6,0,1,0,0-27.2Z"/>
                <path fill="#fff200" d="M362.56,161a13.6,13.6,0,0,0-13.6,13.6V275.67a13.6,13.6,0,0,0,27.2,0V174.58A13.6,13.6,0,0,0,362.56,161Z"/>
                <path fill="#fff200" d="M439.43,265.5,400.12,219l33-30.84a13.6,13.6,0,1,0-18.58-19.87l-38.34,35.86v37.22l4-3.77,38.45,45.45a13.6,13.6,0,1,0,20.77-17.57Z"/>
                <path fill="#fff200" d="M221.54,173.44c-6.14-15.53-28.11-15.57-34.31-.06L148,271.59a13.61,13.61,0,0,0,7.59,17.68h0a13.6,13.6,0,0,0,17.67-7.59L180,264.75h48.41l6.69,16.88a13.59,13.59,0,0,0,17.64,7.64h0a13.59,13.59,0,0,0,7.64-17.65Zm-30.66,64.11,13.45-33.67,13.33,33.67Z"/>
            </g>
        </svg>
    )
}

function IconClipboard(){
    return(
        <svg enable-background="new 0 0 48 48" id="Layer_1" version="1.1" viewBox="0 0 48 48" >
            <path clipRule="evenodd" d="M37,47H11c-2.209,0-4-1.791-4-4V8c0-2.209,1.791-4,4-4h3l0,0c0.553,0,1,0.448,1,1  s-0.447,1-1,1l0,0h-3C9.896,6,9,6.896,9,8v35c0,1.104,0.896,2,2,2h26c1.104,0,2-0.896,2-2V8c0-1.104-0.896-2-2-2h-3l0,0  c-0.553,0-1-0.448-1-1s0.447-1,1-1c0,0,0,0,0.001,0H37c2.209,0,4,1.791,4,4v35C41,45.209,39.209,47,37,47z M35,9  c0,0.552-0.447,1-1,1H14c-0.553,0-1-0.448-1-1s0.447-1,1-1c0,0,1.125-0.125,2-1l2-2c0,0,0.781-1,2-1h1c0-1.657,1.344-3,3-3  c1.657,0,3,1.343,3,3h1c1.312,0,2,1,2,1l2,2c0.875,0.875,2,1,2,1C34.553,8,35,8.448,35,9z M24,3c-0.553,0-1,0.448-1,1h2  C25,3.448,24.553,3,24,3z M29.363,7c0,0-0.679-1-1.817-1h-7.091c-1.14,0-1.818,1-1.818,1l-0.909,1h12.545L29.363,7z" fillRule="evenodd"/>
        </svg>
    )
}

export default Share;