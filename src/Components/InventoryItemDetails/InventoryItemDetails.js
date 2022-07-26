import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./InventoryItemDetails.scss";
import editLogo from '../../Assets/Icons/edit-24px-white.svg';
import axios from 'axios';

const InventoryItemDetails = () => {

    const params = useParams();
    const [inStock, setInStock] = useState(true);
    const [itemDetails, setItemDetails] = useState({});

    useEffect (() => {
        axios.get(`http://localhost:8080/inventory/${params.id}`).then(res => {
            setItemDetails(res.data[0]);
            updateTheStock(res.data[0]);
        }).catch(err => {
            console.log(err);
        });

    }, [params]);

    const updateTheStock = details => {
        if(details.status === "In Stock" && details.quantity > 0) {
            setInStock(true);
        }
        else {
            setInStock(false);
        }
    }


    
    return (
        <section className='inv-details__wrapper'>
            <div className='inv-details__header-wrapper'>
                <div className='inv-details__header-left'>
                    <Link to = {`/inventory`}>
                        <div className='inv-details__back'></div>
                    </Link>
                    <h2 className='inv-details__item'>{itemDetails?.itemName}</h2>
                </div>
                <div className='inv-details__header-right'>
                    <Link to = {`/inventory/edit/${params.id}`}>
                        <div className='inv-details__edit'>
                            <img src={editLogo} alt=''/>
                            <p>Edit</p>
                        </div>
                        <div className='inv-details__edit-mobile'></div>
                    </Link>
                </div>
            </div>
            <div className='inv-details'>
                <div className='inv-details__left'>
                    <h3 className='inv-details__subtitle'>ITEM DESCRIPTION:</h3>
                    <p className='inv-details__description'>{itemDetails?.description}</p>
                    <h3 className='inv-details__subtitle'>CATEGORY:</h3>
                    <p className='inv-details__category'>{itemDetails?.category}</p>
                </div>
                <div className='inv-details__right'>
                    <div className='inv-details__right-top'>
                        <div className='inv-details__status-wrapper'>
                            <h3 className='inv-details__subtitle'>STATUS:</h3>
                            <div className='inv-details__status-tag'>
                                {inStock ? (
                                <p className='inv-details__status instock'>IN STOCK</p>
                                ) : (
                                <p className='inv-details__status oos'>OUT OF STOCK</p>
                                )}
                            </div>
                        </div>
                        <div className='inv-details__quantity-wrapper'>
                            <h3 className='inv-details__subtitle'>QUANTITY:</h3>
                            <p className='inv-details__quantity'>{itemDetails?.quantity}</p>
                        </div>
                    </div>
                    <div className='inv-details__right-bottom'>
                        <h3 className='inv-details__subtitle'>WAREHOUSE:</h3>
                        <p className='inv-details__warehouse'>{itemDetails?.warehouseName}</p>                
                    </div>
                </div>
            </div>
        </section>
    );
}

export default InventoryItemDetails;