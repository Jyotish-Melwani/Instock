import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import "./AddInventory.scss";
import axios from 'axios';
import errorIcon from '../../Assets/Icons/error-24px.svg'

const AddInventory = () => {
    const history = useHistory();
    const [inStock, setInStock] = useState(false);
    const [itemDetails, setItemDetails] = useState({
        itemName: "",
        warehouseName: "",
        status: "Out Of Stock",
        quantity: 0,
        category: "",
        description: "",
        warehouseID: "",

    });
    const [warehouses, setWarehouses] = useState({});
    const [nameError, setNameError] = useState(false);
    const [descError, setDescError] = useState(false);
    const [catError, setCatError] = useState(false);
    const [whError, setWhError] = useState(false);
    const [quantityError, setQuantityError] = useState(false);

    useEffect (() => {
        axios.get(`http://localhost:8080/warehouse/`).then(res => {
            setWarehouses(res.data);   
        });

    }, []);

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
                setQuantityError(false);
            }
        }
    }

    const handleSave = async e => {
        e.preventDefault();
        
        e.target[0].classList.remove('error-state');
        e.target[1].classList.remove('error-state');
        e.target[2].classList.remove('error-state');
        e.target[6].classList.remove('error-state');
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
        if (e.target[2].value === '') {
            e.target[2].classList.add('error-state');
            setCatError(true);
            emptyValue = true;
        } else {
            setCatError(false);
        }
        if (e.target[6].value === '') {
            e.target[6].classList.add('error-state');
            setWhError(true);
            emptyValue = true;
        } else {
            setWhError(false);
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
        
        
        if (window.confirm('Are you sure you want to add this Inventory Item?')) {
            let detailsToSend = itemDetails;
            if(detailsToSend.status === "Out Of Stock") {
                detailsToSend.quantity = 0;
            }    

            await axios.post(`http://localhost:8080/inventory/`, detailsToSend).then(_res => {}).catch(err => console.log(err));
            history.push(`/inventory`);
        };
    }

    const handleCancel = () => {
        if(window.confirm('Are you sure you want to cancel and go back to the Inventory page?')) {
            history.push(`/inventory/`);
        }
    }

    return (
        <section className='inv-add__wrapper'>
            <div className='inv-add__header-wrapper'>
                    <Link to = {`/inventory`}>
                        <div className='inv-add__back'></div>
                    </Link>
                    <h1 className='inv-add__item'>Add New Inventory Item</h1>
            </div>
            <form onSubmit={handleSave}>
                <div className='inv-add'>
                    <div className='inv-add__left'>
                        <h2 className='inv-add__title'>Item Details</h2>
                        <h3 className='inv-add__subtitle' >Item Name</h3>
                        <input className='inv-add__name' name='itemName' placeholder='Item Name' value={itemDetails.itemName} onChange={handleFormChange}></input>
                        <div className={nameError ? 'inv-add__error' : 'inv-add__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>
                        <h3 className='inv-add__subtitle'>Item Description</h3>
                        <textarea className='inv-add__description' name='description' placeholder='Please enter a brief description...' value={itemDetails.description} onChange={handleFormChange}></textarea>
                        <div className={descError ? 'inv-add__error' : 'inv-add__hidden'}>
                            <img src={errorIcon} alt=''/>
                            <p>This field is required</p>
                        </div>
                        <h3 className='inv-add__subtitle'>Category</h3>
                        <select className='inv-add__category' name='category' value={itemDetails.category} onChange={handleFormChange}>
                            <option value="" disabled hidden>Please Select</option>
                            <option value="Accessories">Accessories</option>                        
                            <option value="Apparel">Apparel</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Gear">Gear</option>
                            <option value="Health">Health</option>
                        </select>
                        <div className={catError ? 'inv-add__error' : 'inv-add__hidden'}>
                            <img src={errorIcon} alt=''/>
                            <p>This field is required</p>
                        </div>
                    </div>
                    <div className='inv-add__right'>
                        <h2 className='inv-add__title'>Item Availability</h2>
                        <div className='inv-add__status-wrapper'>
                            <h3 className='inv-add__subtitle'>Status</h3>
                            <div className='inv-add__status-tag'>
                                <div>
                                    <input className={inStock ? '' : 'unselected-radio'} type="radio" id="inStock" name="status" value="In Stock" checked={inStock} onChange={handleFormChange}/>
                                    <label className={inStock ? 'inv-add__status' : 'inv-add__status inv-add__status-unselected'} htmlFor="In Stock">In Stock</label>
                                </div>
                                <div>
                                    <input className={inStock ? 'unselected-radio' : ''} type="radio" id="outOfStock" name="status" value="Out Of Stock" checked={!inStock} onChange={handleFormChange}/>
                                    <label className={inStock ? 'inv-add__status inv-add__status-unselected' : 'inv-add__status'} htmlFor="Out Of Stock">Out Of Stock</label>
                                </div>
                            </div>
                        </div>
                        <div className='inv-add__quantity-wrapper' hidden={inStock ? false : true}>
                            <h3 className='inv-add__subtitle'>Quantity</h3>
                            <input type='number' min="0" className='inv-add__quantity' name='quantity' value={itemDetails.quantity} onChange={handleFormChange}></input>
                        </div>
                        <div className={quantityError ? 'inv-add__error' : 'inv-add__hidden'}>
                            <img src={errorIcon} alt=''/>
                            <p>This field is required</p>
                        </div>
                        <div className='inv-add__right-bottom'>
                            <h3 className='inv-add__subtitle'>Warehouse</h3>
                            <select className='inv-add__warehouse' name='warehouseName' value={itemDetails.warehouseName} onChange={handleFormChange}>
                                <option value="" disabled hidden>Please Select</option>
                                {Array.isArray(warehouses) ? (warehouses.map((w) => (
                                    <option value={w.name} key={w.id}>{w.name}</option>
                                ))) : (<option>loading...</option>)}
                            </select>
                            <div className={whError ? 'inv-add__error' : 'inv-add__hidden'}>
                                <img src={errorIcon} alt=''/>
                                <p>This field is required</p>
                            </div>                
                        </div>
                    </div>
                </div>
                <div className='inv-add__button-wrapper'>
                    <button type='button' className='inv-add__button inv-add__button-cancel' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='inv-add__button inv-add__button-save' >+ Add Item</button>
                </div>
            </form>
        </section>
    );
}

export default AddInventory;