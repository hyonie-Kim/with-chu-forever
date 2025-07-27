import classNames from 'classnames/bind';
import styles from './Video.module.scss'

import Section from '../shared/Section';

const cx = classNames.bind(styles)

function Video(){
    return (
    <Section className={cx('container')}>
        <video autoPlay={true} muted={true} loop={true} poster='/assets/poster.jpg'>
            <source src="/assets/main.mp4" type="video/mp4"></source>
        </video>
        {/* <picture>
            <source srcSet="photo.avif" type="image/avif" />
            <source srcSet="photo.webp" type="image/webp" />
            <img src="photo.jpg" alt="메인 이미지" />
        </picture> */}
    </Section>)
}

export default Video