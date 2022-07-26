import './InventoryListRow.scss'
import ChevronIcon from '../../Assets/Icons/chevron_right-24px.svg'
import BinIcon from '../../Assets/Icons/delete_outline-24px.svg'
import PencilIcon from '../../Assets/Icons/edit-24px.svg'
import { Link } from 'react-router-dom'
import React, {useEffect, useState, useRef} from 'react'
import axios from "axios";

import ModalDialog from './../ModalDialog/ModalDialog.jsx';

const InventoryListRow = (props) => {  

    const statusTextElement = useRef([])
    const warehouseColumn = useRef([])
    const [showModalDialog, setShowModalDialog] = useState(false);

    useEffect(()=>{
        if (props.status === 'In Stock'){
            statusTextElement.current.classList.add('inventoryListRow__status--active')
        } else{
            statusTextElement.current.classList.add('inventoryListRow__status--inactive')
        }
        if (props.fifthColumn === null){
            warehouseColumn.current.classList.add('inventoryListRow__container--hidden')
        }
    })

    const openModalDialog = () => {
        setShowModalDialog(true);
    }

    const closeModalDialog = () => {
        setShowModalDialog(false);
    }

    const deleteInventoryCallback = async () => {
        const response = await axios.delete(`http://localhost:8080/inventory/${props.itemID}`);

        if (response.data?.deleteInventory) {
            props.onDataChange();
        }

        setShowModalDialog(false);
    }


    return(
        <>
            <ModalDialog 
                showModalDialog={showModalDialog}
                title={`Delete ${props.item} inventory item?`}
                content={`Please confirm that you'd like to delete ${props.item} from the inventory list. You won't be able to undo this action.`}
                onCancel={closeModalDialog}
                onDelete={deleteInventoryCallback}>
            </ModalDialog>
            <div className='inventoryListRow'>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--primary`}>
                    <div className='inventoryListRow__header-container'>
                        <p className='inventoryListRow__header'>INVENTORY ITEM</p>
                    </div>
                    <div className='inventoryListRow__subContainer'>
                        <Link className='inventoryListRow__link' to={`/inventory/${props.itemID}`}>
                            <p className='inventoryListRow__text inventoryListRow__text--primary'>{props.item}</p>
                            <img className='inventoryListRow__icon' src={ChevronIcon} alt="Chevron right arrow icon" />
                        </Link>
                    </div>
                </div>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--secondary`}>
                    <div className='inventoryListRow__header-container'>
                        <p className='inventoryListRow__header'>CATEGORY</p>
                    </div>
                    <div>
                        <p className='inventoryListRow__text'>{props.category}</p>
                    </div>
                </div>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--tertiary`}>
                    <div className='inventoryListRow__header-container'>
                        <p className='inventoryListRow__header'>STATUS</p>
                    </div>
                    <div>
                        <p className='inventoryListRow__text inventoryListRow__status'ref={statusTextElement}>{props.status}</p>
                    </div>
                </div>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--quaternary`}>
                    <div className='inventoryListRow__header-container'>
                        <p className='inventoryListRow__header'>QTY</p>
                    </div>
                    <div>
                        <p className='inventoryListRow__text'>{props.quantity}</p>
                    </div>
                </div>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--quinary`} ref={warehouseColumn}>
                    <div className='inventoryListRow__header-container'>
                        <p className='inventoryListRow__header'>WAREHOUSE</p>
                    </div>
                    <div>
                        <p className='inventoryListRow__text'>{props.warehouseName}</p>
                    </div>
                </div>
                <div className={`inventoryListRow__container inventoryListRow__${props.className}-container--senary`}>
                    <img className='inventoryListRow__image' src={BinIcon} onClick={openModalDialog} alt="Garbage Bin Icon Button" />
                    <Link className='inventoryListRow__link-edit' to={`/inventory/edit/${props.itemID}`}>    
                        <img className='inventoryListRow__image' src={PencilIcon} alt="Pencil Icon Button" />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default InventoryListRow;