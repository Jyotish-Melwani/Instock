import './ModalDialog.scss';
import closeIcon from './../../Assets/Icons/close-24px.svg';

import ReactModal from 'react-modal';

const ModalDialog = (props) => {
    
    return (
        <ReactModal
            ariaHideApp={ false}
            className={'modal-dialog'}
            overlayClassName={'modal-dialog__overlay'}
            isOpen={props.showModalDialog}
            contentLabel={props.content}>
                    <div onClick={props.onCancel} className='modal-dialog__close'>
                        <img src={closeIcon} alt=''/>
                    </div>
                    <h1 className='modal-dialog__title'>{props.title}</h1>
                    <p>{props.content}</p>
                    <div className='modal-dialog__mobile-spacer'></div>
                    <div className='modal-dialog__button-row'>
                        <div onClick={props.onCancel} className='modal-dialog__button modal-dialog__button--cancel'>
                            <p>Cancel</p>
                        </div>
                        <div onClick={props.onDelete} className='modal-dialog__button modal-dialog__button--delete'>
                            <p>Delete</p>
                        </div>
                    </div>
        </ReactModal>
    )
}

export default ModalDialog