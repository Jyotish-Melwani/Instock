import React, {useState, useEffect} from 'react'
import axios from "axios";
import SearchHeader from '../../Components/SearchHeader/SearchHeader';
import WarehouseRow from '../../Components/WarehouseRow/WarehouseRow'
import TableHeader from '../../Components/TableHeader/TableHeader'
import './WarehouseList.scss'

const WarehouseList = () =>{

    const [data, setData] = useState([]);
    const [searchedData, setSearchedData] = useState([]);

    useEffect(()=>{
        requestWarehouseList();
    }, [])

    const requestWarehouseList = () => {
        axios.get('http://localhost:8080/warehouse')
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
            if (row.address.toLowerCase().match(q) || row.contact.name.toLowerCase().match(q) || row.contact.phone.toLowerCase().match(q) || row.contact.email.toLowerCase().match(q) || row.name.toLowerCase().match(q)) {
                newSearch.push(row);
            }
        })
        setSearchedData(newSearch);
    }

    return(
        <div className='warehouseList__wrapper-container'>
            <SearchHeader title={'Warehouses'} searchData={searchData} buttonText={'+ Add New Warehouse'} buttonLink={'/warehouse/add'}/>
            <TableHeader
             className={'warehouseList'}
             firstHeader={'WAREHOUSE'} 
             secondHeader={'ADDRESS'} 
             thirdHeader={'CONTACT NAME'} 
             fourthHeader={'CONTACT INFORMATION'} 
             fifthHeader={null}
             sixthHeader={'ACTIONS'}/>
             <div className='warehouseList__wrapper-subContainer'>
                {searchedData.map((singleWarehouse) => {
                    return <WarehouseRow
                    key={singleWarehouse.id}
                    id={singleWarehouse.id}
                    warehouseName={singleWarehouse.name}
                    address={singleWarehouse.address}
                    city={singleWarehouse.city}
                    country={singleWarehouse.country}
                    contact={singleWarehouse.contact.name}
                    phone={singleWarehouse.contact.phone}
                    email={singleWarehouse.contact.email}
                    onDataChange={requestWarehouseList}/>
                })} 
            </div>
        </div>
    )
}

export default WarehouseList;