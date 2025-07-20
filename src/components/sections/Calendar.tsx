import { parseISO, format } from 'date-fns'
import classNames from 'classnames/bind'
import Section from '../shared/Section'
import { ko } from 'date-fns/locale' 
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
import styles from './Calender.module.scss'

const cx = classNames.bind(styles)

const css =`
     .rdp-nav{
    display:none;
    }
    .rdp-day{
    cursor: default;
    }
    .rdp-weekday{
        font-weight: bold;
        font-size:14px;
    }
    .rdp-selected .rdp-day_button{
    background-color:var(--red);
    border: none;
    ont-weight: bold;
    color: #fff;
    }
`

function Calendar({date}:{date:string}){
    const weddingDate = parseISO(date)
    return (
        <Section
        title={
            <div className={cx('wrap-header')}>
                <span className={cx('txt-date')}>{format(weddingDate, 'yyyy.MM.dd')}</span>
                <span className={cx('txt-time')}>{format(weddingDate, 'aaa h시 eeee', {locale:ko})}</span>
            </div>
        }
        >
            

            <div className={cx('wrap-calender')}>
                <style>{css}</style>
                <DayPicker mode={'multiple'} locale={ko} month={weddingDate} required selected={[weddingDate]} formatters={{formatCaption: () => ''}}/>
            </div>
        </Section>
    )
}

export default Calendar