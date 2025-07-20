import classNames from 'classnames/bind'

import Section from '../shared/Section'
import styles from './ImagesGellery.module.scss'

import ImageViewer from '../ImageViewer';
import { useState } from 'react';

const cx = classNames.bind(styles)

function ImagesGallery({images} : {images:string[]}){

    // -1 선택되지 않음
    const [selectedIdx, setSelectedIdx] = useState(-1)

    const open = selectedIdx > -1
    const handleSelectedImage = (idx:number) =>{
        setSelectedIdx(idx);
    }
    const handleClose = ()=>{
        setSelectedIdx(-1);
    }
    return(
        <>
        <Section title='사진첩'>
            <ul className={cx('wrap-images')}>
                {images.map((src, idx)=>(
                    <li key={idx} className={cx('wrap-image')} onClick={()=>{
                        handleSelectedImage(idx)
                    }}>
                        <img src={src} alt='웨딩 이미지'/>
                    </li>
                ))}
            </ul>
        </Section>
        <ImageViewer images={images} open={open} selectedIdx={selectedIdx} onClose={handleClose}/>
        </>
    )
}

export default ImagesGallery