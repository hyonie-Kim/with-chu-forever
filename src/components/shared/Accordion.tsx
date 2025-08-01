import classNames from 'classnames/bind'
import Styles from './Accordion.module.scss'
import { PropsWithChildren, useState } from 'react';

const cx = classNames.bind(Styles);

interface AccordionProps{
    label: string
}
function Accordion ({label, children}:PropsWithChildren<AccordionProps>){
    const [expanded, setExpanded] = useState(true);

    const handleToggle = () =>{
        setExpanded((prev) => !prev)
    }

    return(
        <div className={cx('wrap-accordion', expanded? 'open': '')}>
            <div className={cx('wrap-header')} onClick={handleToggle}>
                <span>{label}</span>
                <IconArrowDown className={cx('ico-arrow-down')}/>
            </div>
            <div className={cx('wrap-content')}>
                {/* 콘텐츠영역 */}
            {children}
            </div>
        </div>
    )
}

function IconArrowDown({className}: {className:string}){
    return(
        <svg className={className} id="Layer_1" version="1.1" viewBox="0 0 512 512" >
            <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/>
        </svg>
    )
}

export default Accordion