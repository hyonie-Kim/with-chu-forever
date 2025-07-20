import classNames from 'classnames/bind';
import styles from './Modal.module.scss';
import Dimmed from './Dimmed';

interface ModalProps{
    open: boolean;
    title?:string;
    body: React.ReactNode;
    rightButtonLabel?: string;
    onRightButtonClick: () => void;
    leftButtonLable?:string;
    onLeftButtonClick: () => void
}
const cx = classNames.bind(styles)
function Modal({open, title, body, rightButtonLabel = '확인', leftButtonLable='닫기', onRightButtonClick,onLeftButtonClick}:ModalProps){
    if(open === false){
        return null
    }

    return (
        <Dimmed>
            <div className={cx('wrap-modal')}>
                <div className={cx('wrap-body')}>
                    <div className={cx('wrap-content')}>
                        {title == null? null : <div className={cx('txt-title')}>{title}</div>}
                        {body}
                    </div>
                    <div className={cx('wrap-buttons')}>
                        <button onClick={onLeftButtonClick}>{leftButtonLable}</button>
                        <button onClick={onRightButtonClick}>{rightButtonLabel}</button>
                    
                    </div>
                </div>
            </div>
        </Dimmed>
    )
}

export default Modal;