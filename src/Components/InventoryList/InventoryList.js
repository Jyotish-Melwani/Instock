import React, {useState, useEffect} from 'react'
import axios from "axios";
import SearchHeader from '../SearchHeader/SearchHeader';
import TableHeader from '../TableHeader/TableHeader';
import './InventoryList.scss';
import InventoryListRow from '../InventoryListRow/InventoryListRow';


const InventoryList = () =>{

    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState([]);

    useEffect(()=>{
        requestInventoryList();
    }, [])

    const requestInventoryList = () => {
        axios.get('http://localhost:8080/inventory')
        .then(result =>{
            setData(result.data);
            setSearchedData(result.data);
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const searchData = query => {
        const newSearch = [];
        const q = query.toLowerCase();

        data.forEach(row => {
            if (row.itemName.toLowerCase().match(q) || row.category.toLowerCase().match(q) || row.warehouseName.toLowerCase().match(q)) {
                newSearch.push(row);
            }
        })
        setSearchedData(newSearch);
    }

    return(
        <div className='inventoryList__wrapper-container'>
            <SearchHeader title={'Inventory'} searchData={searchData} buttonText={'+ Add New Item'} buttonLink={'/inventory/add'}/>
            <TableHeader
             className={'inventoryList'}
             firstHeader={'INVENTORY ITEM'} 
             secondHeader={'CATEGORY'} 
             thirdHeader={'STATUS'} 
             fourthHeader={'QTY'} 
             fifthHeader={'WAREHOUSE'}
             sixthHeader={'ACTIONS'}/>
            <div className='inventoryList__wrapper-subContainer'> 
                {searchedData.map((singleInventory) => {
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