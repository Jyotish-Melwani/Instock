import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./EditInventory.scss";
import axios from 'axios';
import errorIcon from '../../Assets/Icons/error-24px.svg'

const EditInventory = () => {
    const history = useHistory();
    const params = useParams();
    const [inStock, setInStock] = useState(true);
    const [itemDetails, setItemDetails] = useState({
        itemName: "",
        warehouseName: "",
        status: "",
        quantity: 0,
        description: "",
        id: "",
        warehouseID: "",

    });
    const [warehouses, setWarehouses] = useState({});
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);

    useEffect (() => {
        axios.get(`http://localhost:8080/inventory/${params.id}`).then(res => {
            setItemDetails(res.data[0]);
            updateTheStock(res.data[0]);
        }).catch(err => {
            console.log(err);
        });
        axios.get(`http://localhost:8080/warehouse/`).then(res => {
            setWarehouses(res.data);   
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

    const handleFormChange = e => {
        // update item details
        if (e.target.name === 'warehouseName') {
           
            const wh = warehouses.filter(wh => wh.name === e.target.value);
            setItemDetails({...itemDetails, warehouseID: wh[0].id, [e.target.name]: e.target.value});
        } 
        else {
            
            setItemDetails({...itemDetails, [e.target.name]: e.target.value});
        }

        //update stock status as well
        if (e.target.name === 'status') {
            if(e.target.value === "In Stock") {
                setInStock(true);
            }
            else {
                setInStock(false);
            }
        }
    }

    const handleSave = async e => {
        e.preventDefault();
        console.log(e);
        
        e.target[0].classList.remove('error-state');
        e.target[1].classList.remove('error-state');
        e.target[5].classList.remove('error-state');

        let emptyValue = false;
        if (e.target[0].value === '') { 
            e.target[0].classList.add('error-state');
            setNameError(true);
            emptyValue = true;
        } else {
            setNameError(false);
        }
        if (e.target[1].value === '') {
            e.target[1].classList.add('error-state');
            setDescError(true);
            emptyValue = true;
        } else {
            setDescError(false);
        }
        if (e.target[5].value <= '0' && itemDetails.status === 'In Stock') {
            e.target[5].classList.add('error-state');
            setQuantityError(true);
            emptyValue = true;
        } else {
            setQuantityError(false);
        }

        if (emptyValue) {
            return false;
        }
        
        console.log(itemDetails);
        if (window.confirm('Are you sure you want to update this Inventory Item?')) {
            let detailsToSend = itemDetails;
            if(detailsToSend.status === "Out Of Stock") {
                detailsToSend.quantity = 0;
            }
            await axios.put(`http://localhost:8080/inventory/${params.id}`, detailsToSend).then(res => console.log(res)).catch(err => console.log(err));
            history.push(`/inventory/${params.id}`);
        };
    }

    const handleCancel = () => {
        if(window.confirm('Are you sure you want to cancel and go to the Inventory Detail page?')) {
            history.push(`/inventory/${params.id}`);
        }
    }


    console.log( nameError, descError, quantityError);
    return (
        <section className='inv-edit__wrapper'>
            <div className='inv-edit__header-wrapper'>
                    <Link to = {`/inventory/${params.id}`}>
                        <div className='inv-edit__back'></div>
                    </Link>
                    <h1 className='inv-edit__item'>Edit Inventory Item</h1>
            </div>
            <form onSubmit={handleSave}>
                <div className='inv-edit'>
                    <div className='inv-edit__left'>
                        <h2 className='inv-edit__title'>Item Details</h2>
                        <h3 className='inv-edit__subtitle' >Item Name</h3>
                        <input className='inv-edit__name' name='itemName' value={itemDetails.itemName} onChange={handleFormChange}></input>
                        <div className={nameError ? 'inv-edit__error' : 'inv-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>
                        <h3 className='inv-edit__subtitle'>Item Description</h3>
                        <textarea className='inv-edit__description' name='description' value={itemDetails.description} onChange={handleFormChange}></textarea>
                        <div className={descError ? 'inv-edit__error' : 'inv-edit__hidden'}>
                            <img src={errorIcon} alt=''/>
                            <p>This field is required</p>
                        </div>
                        <h3 className='inv-edit__subtitle'>Category</h3>
                        <select className='inv-edit__category' name='category' value={itemDetails.category} onChange={handleFormChange}>
                            <option value="Accessories">Accessories</option>                        
                            <option value="Apparel">Apparel</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Gear">Gear</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <div className='inv-edit__right'>
                        <h2 className='inv-edit__title'>Item Availability</h2>
                        <div className='inv-edit__status-wrapper'>
                            <h3 className='inv-edit__subtitle'>Status</h3>
                            <div className='inv-edit__status-tag'>
                                <div>
                                    <input className={inStock ? '' : 'unselected-radio'} type="radio" id="inStock" name="status" value="In Stock" checked={inStock} onChange={handleFormChange}/>
                                    <label className={inStock ? 'inv-edit__status' : 'inv-edit__status inv-edit__status-unselected'} htmlFor="In Stock">In Stock</label>
                                </div>
                                <div>
                                    <input className={inStock ? 'unselected-radio' : ''} type="radio" id="outOfStock" name="status" value="Out Of Stock" checked={!inStock} onChange={handleFormChange}/>
                                    <label className={inStock ? 'inv-edit__status inv-edit__status-unselected' : 'inv-edit__status'} htmlFor="Out Of Stock">Out Of Stock</label>
                                </div>
                            </div>
                        </div>
                        <div className='inv-edit__quantity-wrapper' hidden={inStock ? false : true}>
                            <h3 className='inv-edit__subtitle'>Quantity</h3>
                            <input type='number' min="0" className='inv-edit__quantity' name='quantity' value={itemDetails.quantity} onChange={handleFormChange}></input>
                        </div>
                        <div className={quantityError ? 'inv-edit__error' : 'inv-edit__hidden'}>
                            <img src={errorIcon} alt=''/>
                            <p>This field is required</p>
                        </div>
                        <div className='inv-edit__right-bottom'>
                            <h3 className='inv-edit__subtitle'>Warehouse</h3>
                            <select className='inv-edit__warehouse' name='warehouseName' value={itemDetails.warehouseName} onChange={handleFormChange}>
                                {Array.isArray(warehouses) ? (warehouses.map((w) => (
                                    <option value={w.name} key={w.id}>{w.name}</option>
                                ))) : (<option>loading...</option>)}
                            </select>                
                        </div>
                    </div>
                </div>
                <div className='inv-edit__button-wrapper'>
                    <button type='button' className='inv-edit__button inv-edit__button-cancel' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='inv-edit__button inv-edit__button-save' >Save</button>
                </div>
            </form>
        </section>
    );
}

export default EditInventory;