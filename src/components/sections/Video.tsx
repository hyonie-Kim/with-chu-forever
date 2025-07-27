import classNames from 'classnames/bind';
import styles from './Video.module.scss'

import Section from '../shared/Section';

const cx = classNames.bind(styles)

function Video(){
    return (
    <Section className={cx('container')}>

        {/* <video autoPlay={true} muted={true} loop={true} poster='/assets/poster.jpg'>
            <source src="/assets/main.mp4" type="video/mp4"></source>
        </video> */}
         <picture className={cx('picture-container')}>
            {/* <source srcSet="photo.avif" type="image/avif" />
            <source srcSet="photo.webp" type="image/webp" /> */}
            <img src="assets/images/chu_wedding_day.png" alt="메인 이미지" />
            
            {/* 꽃송이 애니메이션 */}
            <div className={cx('petal', 'petal-1')}>🌸</div>
            <div className={cx('petal', 'petal-2')}>🌺</div>
            <div className={cx('petal', 'petal-3')}>🌼</div>
            <div className={cx('petal', 'petal-4')}>🌻</div>
            <div className={cx('petal', 'petal-5')}>🌷</div>
            <div className={cx('petal', 'petal-6')}>🌹</div>
            <div className={cx('petal', 'petal-7')}>💐</div>
            <div className={cx('petal', 'petal-8')}>🌸</div>
        </picture> 
    </Section>)
}

export default Video