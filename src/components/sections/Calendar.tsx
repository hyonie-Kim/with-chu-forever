import { parseISO, format } from 'date-fns'
import classNames from 'classnames/bind'
import Section from '../shared/Section'
import { ko } from 'date-fns/locale' 
import { DayPicker } from 'react-day-picker'

import 'react-day-picker/dist/style.css'
import styles from './Calender.module.scss'

const cx = classNames.bind(styles)



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
                <div 
                    style={{ 
                        pointerEvents: 'none',
                        userSelect: 'none'
                    }}
                >
                    <DayPicker 
                        mode={'single'} 
                        locale={ko} 
                        month={weddingDate} 
                        selected={weddingDate} 
                        formatters={{formatCaption: () => ''}}
                        onDayClick={() => {
                            // 클릭해도 선택된 날짜를 변경하지 않음
                            return;
                        }}
                        onSelect={() => {
                            // 선택 이벤트도 무시
                            return;
                        }}
                    />
                </div>
            </div>
        </Section>
    )
}

export default Calendar