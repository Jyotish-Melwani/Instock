import {useState} from 'react'
import './WarehouseRow.scss'
import axios from "axios";
import ChevronIcon from '../../Assets/Icons/chevron_right-24px.svg'
import BinIcon from '../../Assets/Icons/delete_outline-24px.svg'
import PencilIcon from '../../Assets/Icons/edit-24px.svg'
import { Link } from 'react-router-dom'

import ModalDialog from './../ModalDialog/ModalDialog.jsx';

const WarehouseRow = (props) => {  

    const [showModalDialog, setShowModalDialog] = useState(false);
    
    const openModalDialog = () => {
        setShowModalDialog(true);
    }

    const closeModalDialog = () => {
        setShowModalDialog(false);
    }

    const deleteWarehouseCallback = async () => {
        const response = await axios.delete(`http://localhost:8080/warehouse/${props.id}`);

        if (response.data?.deletedWarehouse) {
            props.onDataChange();
        }

        setShowModalDialog(false);
    }

    return(
        <>
            <ModalDialog 
                showModalDialog={showModalDialog}
                title={`Delete ${props.warehouseName} warehouse?`}
                content={`Please confirm that you'd like to delete the ${props.warehouseName} from the list of warehouses. You won't be able to undo this action.`}
                onCancel={closeModalDialog}
                onDelete={deleteWarehouseCallback}>
            </ModalDialog>
            <div className='warehouseRow'>
                <div className='warehouseRow__container warehouseRow__container--primary'>
                    <div className='warehouseRow__header-container'>
                        <p className='warehouseRow__header'>WAREHOUSE</p>
                    </div>
                    <div className='warehouseRow__subContainer'>
                        <Link className='warehouseRow__link' to={`warehouse/${props.id}`}>
                            <p className='warehouseRow__text warehouseRow__text--primary'>{props.warehouseName}</p>
                            <img className='warehouseRow__icon' src={ChevronIcon} alt="Chevron right arrow icon" />
                        </Link>
                    </div>
                </div>
                <div className='warehouseRow__container warehouseRow__container--secondary'>
                    <div className='warehouseRow__header-container'>
                        <p className='warehouseRow__header'>ADDRESS</p>
                    </div>
                    <div>
                        <p className='warehouseRow__text'>{props.address}, {props.city}, {props.country}</p>
                    </div>
                </div>
                <div className='warehouseRow__container warehouseRow__container--tertiary'>
                    <div className='warehouseRow__header-container'>
                        <p className='warehouseRow__header'>CONTACT NAME</p>
                    </div>
                    <div>
                        <p className='warehouseRow__text'>{props.contact}</p>
                    </div>
                </div>
                <div className='warehouseRow__container warehouseRow__container--quaternary'>
                    <div className='warehouseRow__header-container'>
                        <p className='warehouseRow__header'>CONTACT INFORMATION</p>
                    </div>
                    <div>
                        <p className='warehouseRow__text'>{props.phone}</p>
                        <p className='warehouseRow__text'>{props.email}</p>
                    </div>
                </div>
                <div className='warehouseRow__container warehouseRow__container--senary'>
                    <img className='warehouseRow__image' src={BinIcon} onClick={openModalDialog}  alt="Garbage Bin Icon Button" />
                    <Link className='warehouseRow__link-edit' to={`/warehouse/edit/${props.id}`}>
                        <img className='warehouseRow__image' src={PencilIcon} alt="Pencil Icon Button" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default WarehouseRow;