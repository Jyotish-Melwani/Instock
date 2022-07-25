import React, {useState, useEffect} from 'react'
import axios from "axios";
import SearchHeader from '../SearchHeader/SearchHeader';
import TableHeader from '../TableHeader/TableHeader';
import './InventoryList.scss';
import InventoryListRow from '../InventoryListRow/InventoryListRow';


const InventoryList = () =>{

    const [data, setData] = useState([])

    useEffect(()=>{
        requestInventoryList();
    }, [])

    const requestInventoryList = () => {
        axios.get('http://localhost:8080/inventory')
        .then(result =>{
            setData(result.data)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return(
        <div className='inventoryList__wrapper-container'>
            <SearchHeader title={'Inventory'} buttonText={'+ Add New Item'} buttonLink={'/inventory/add'}/>
            <TableHeader
             className={'inventoryList'}
             firstHeader={'INVENTORY ITEM'} 
             secondHeader={'CATEGORY'} 
             thirdHeader={'STATUS'} 
             fourthHeader={'QTY'} 
             fifthHeader={'WAREHOUSE'}
             sixthHeader={'ACTIONS'}/>
            <div className='inventoryList__wrapper-subContainer'> 
                {data.map((singleInventory) => {
                    return <InventoryListRow 
                    fifthColumn={'inventory'}
                    className={'inventory'}
                    itemID={singleInventory.id}
                    item={singleInventory.itemName}
                    warehouseName={singleInventory.warehouseName}
                    category={singleInventory.category}
                    description={singleInventory.description}
                    quantity={singleInventory.quantity}
                    status={singleInventory.status}
                    warehouseID={singleInventory.warehouseID}
                    onDataChange={requestInventoryList}
                    key={singleInventory.id}/>
                })} 
            </div>
        </div>
    )
}

export default InventoryList;