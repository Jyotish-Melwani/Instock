import React, {useState, useEffect} from 'react'
import axios from "axios";
import TableHeader from '../../Components/TableHeader/TableHeader'
import InventoryListRow from '../InventoryListRow/InventoryListRow';
import {Link, useParams } from 'react-router-dom';
import editLogo from '../../Assets/Icons/edit-24px-white.svg';
import "./WarehouseDetails.scss"


const WarehouseDetails = () =>{

    const params = useParams();
    
    const [data, setData] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
        contact: [],
        warehouseInventory: [],
    });

    const [InventoryData] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/warehouse/${params.id}`)
        .then(result =>{
            // console.log(result.data)

            const UpdatedData = {};

            for (const key in data) {
                if (key in result.data) {
                    UpdatedData[key] = result.data[key];
                }
            }
            console.log(UpdatedData)

            setData(UpdatedData)
        })
        .catch(error =>{
            console.log(error)
        })
    }, [params])

    return(
        <div className='warehouseDetail__main'>
        <section className="warehouseDetail__wrapper">
            <div className='inv-details__header-wrapper'>
                <div className='inv-details__header-left'>
                    <Link to = {`/warehouse`}>
                        <div className='inv-details__back'></div>
                    </Link>
                    <h2 className='inv-details__item'>{data.name}</h2>
                </div>
                <div className='inv-details__header-right'>
                    <Link to = {`/warehouse/edit/${params.id}`}>
                        <div className='inv-details__edit'>
                            <img src={editLogo} alt=''/>
                            <p>Edit</p>
                        </div>
                        <div className='inv-details__edit-mobile'></div>
                    </Link>
                </div>
            </div>
            <div className='warehouseDetail__container--all'>
            <div className="warehouseDetail__detail-container warehouseDetail__detail-container--primary">
                <h4 className="warehouseDetail__title">WAREHOUSE ADDRESS: </h4>
                <p className="warehouseDetail__text">{data.address}</p>
                <p className="warehouseDetail__text">{data.city} , {data.country}</p>  
            </div>
            <div className='warehouseDetail-flex'>
            <div className="warehouseDetail__detail-container">
                <h4 className="warehouseDetail__title">CONTACT NAME:</h4>
                <p className="warehouseDetail__text">{data.contact.name}</p>
                <p className="warehouseDetail__text">{data.contact.position}</p>
                            
            </div>
            <div className="warehouseDetail__detail-container">
                <h4 className="warehouseDetail__title">CONTACT INFORMATION: </h4>
                <p className="warehouseDetail__text">{data.contact.phone}</p>
                <p className="warehouseDetail__text">{data.contact.email}</p>
            </div>
            </div>
            </div>
            </section>
            <TableHeader
            className={'warehouseDetails'}
            firstHeader={'INVENTORY ITEM'} 
            secondHeader={'CATEGORY'} 
            thirdHeader={'STATUS'} 
            fourthHeader={'QUANTITY'} 
            fifthHeader={null}
            sixthHeader={'ACTIONS'}/>
            <div className="warehouseDetail__wrapper-subContainer">
                {data.warehouseInventory.map((singleInventory) => {
                    return <InventoryListRow
                    fifthColumn={null}
                    itemID={singleInventory.id}
                    className={"warehouseDetails"}
                    item={singleInventory.itemName}
                    category={singleInventory.category}
                    description={singleInventory.description}
                    quantity={singleInventory.quantity}
                    status={singleInventory.status}
                    warehouseID={singleInventory.warehouseID}
                    key={singleInventory.id}/>
                })}
            </div>
            </div>
    )
}

export default WarehouseDetails