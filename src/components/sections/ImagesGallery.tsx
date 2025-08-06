import classNames from 'classnames/bind'
import { useState } from 'react';

import Section from '../shared/Section'
import styles from './ImagesGellery.module.scss'

import ImageViewer from '../ImageViewer';

const cx = classNames.bind(styles)

function ImagesGallery({images} : {images:string[]}){

    // -1 선택되지 않음
    const [selectedIdx, setSelectedIdx] = useState(-1);

    // -1 보다 크면 오픈 
    //const open = selectedIdx !== -1
    // 또는
    const open = selectedIdx > -1

    const handleSelectedImage = (idx:number) =>{
        console.log("이미지 클릭됨 - idx:", idx)
        console.log("현재 images 배열:", images)
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
                    <li key={idx} className={cx('wrap-image')} onClick={()=>{ handleSelectedImage(idx)}}>
                        {/* <picture>
                             <source srcSet={generateImageUrl({
                                filename:src, 
                                format: 'webp', 
                                option: 'w_240,h_240,q_auto,c_fill'})} 
                                type="image/webp" /> 
                            <img src={generateImageUrl({
                                filename:src,
                                format:'jpeg',
                                option: 'w_240,h_240,q_auto,c_fill'
                            })} alt='웨딩 이미지'/>
                           
                        </picture> */}
                        <picture>
                             <source srcSet={`${src}.webp`}
                                type="image/webp" /> 
                            <img src={`${src}.jpeg`} alt='웨딩 이미지'/>
                           
                        </picture>
                        
                    </li>
                ))}
            </ul>
        </Section>
        <ImageViewer 
        images={images} 
        open={open} 
        selectedIdx={selectedIdx} 
        onClose={handleClose}/>
        </>
    )
}

export default ImagesGallery