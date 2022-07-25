import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import "./EditWarehouse.scss";
import axios from 'axios';
import errorIcon from '../../Assets/Icons/error-24px.svg'

const EditWarehouse = () => {
    const history = useHistory();
    const params = useParams();

    const [warehouseDetails, setWarehouseDetails] = useState({
        name: "",
        address: "",
        city: "",
        country: "",
    });

    const [contactDetails, setContactDetails] = useState({
        name: "",
        position: "",
        phone: "",
        email: "",
    });
    
    const [fieldErrorWarehouse, setFieldErrorWarehouse] = useState({
        name: false,
        address: false,
        city: false,
        country: false,
    });

    const [fieldErrorContact, setFieldErrorContact] = useState({
        name: false,
        position: false,
        phone: false,
        email: false,
    });

    /* 
    const [descError, setDescError] = useState(false);
    const [quantityError, setQuantityError] = useState(false); */

    useEffect (() => {
        axios.get(`http://localhost:8080/warehouse/${params.id}`).then(res => {
            const updatedWarehouseDetails = {};
            const updatedContactDetails = {};
            
            for (const key in warehouseDetails) {
                if (key in res.data) {
                    updatedWarehouseDetails[key] = res.data[key];
                }
            }

            for (const key in contactDetails) {
                if (key in res.data?.contact) {
                    updatedContactDetails[key] = res.data.contact[key];
                }
            }

            setWarehouseDetails(updatedWarehouseDetails);
            setContactDetails(updatedContactDetails);

        }).catch(err => {
            console.log(err);
        });

    }, [params]);

    const handleFormChange = e => {
        
        if (e.target.name.includes('contact')) {
            setContactDetails({...contactDetails, [e.target.name.substring(8)]: e.target.value});
        }
        else {
            setWarehouseDetails({...warehouseDetails, [e.target.name]: e.target.value});
        }
    }
    
    const handleCancel = () => {
        if(window.confirm('Are you sure you want to cancel and go back to the previous page?')) {
            history.push(`/warehouse/${params.id}`);
        }
    }

    const handleSave = e => {
        e.preventDefault();

        // Have tracker so that we do at least scan through all fields.
        let foundError = false;

        // For left panel
        const updatedErrorStateWarehouse = { ...fieldErrorWarehouse};
        for (let i = 0; i < 4; i++) {
            if (e.target[i].value.trim() === '') { 
                e.target[i].classList.add('error-state');
                updatedErrorStateWarehouse[e.target[i].name] = true;

                foundError = true;
            } else {
                e.target[i].classList.remove('error-state');
                updatedErrorStateWarehouse[e.target[i].name] = false;
            }
        }

        setFieldErrorWarehouse(updatedErrorStateWarehouse);

        // For right panel
        const updatedErrorStateContact = { ...fieldErrorContact};
        for (let i = 4; i < 8; i++) {
            if (e.target[i].value.trim() === '') { 
                e.target[i].classList.add('error-state');
                updatedErrorStateContact[e.target[i].name.substring(8)] = true;

                foundError = true;
            } else {
                e.target[i].classList.remove('error-state');
                updatedErrorStateContact[e.target[i].name.substring(8)] = false;
            }
        }

        setFieldErrorContact(updatedErrorStateContact);

        if (foundError) {
            return;
        }

        if (window.confirm('Are you sure you want to update this warehouse Item?')) {
            
            const requestBody = warehouseDetails;
            requestBody.contact = contactDetails;
            axios.put(`http://localhost:8080/warehouse/${params.id}`, requestBody).then(res => console.log(res)).catch(err => console.log(err));
            history.push(`/warehouse/${params.id}`);
        };
    }

    return (
        <section className='warehouse-edit__wrapper'>
            <div className='warehouse-edit__header-wrapper'>
                    <Link to = {`/warehouse/${params.id}`}>
                        <div className='warehouse-edit__back'></div>
                    </Link>
                    <h1 className='warehouse-edit__item'>Edit Warehouse</h1>
            </div>
            <form onSubmit={handleSave}>
                <div className='warehouse-edit'>
                    <div className='warehouse-edit__left'>
                        
                        <h2 className='warehouse-edit__title'>Warehouse Details</h2>

                        <h3 className='warehouse-edit__subtitle' >Warehouse Name</h3>
                        <input className='warehouse-edit__input' name='name' value={warehouseDetails.name} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.name ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Street Address</h3>
                        <input className='warehouse-edit__input' name='address' value={warehouseDetails.address} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.address ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >City</h3>
                        <input className='warehouse-edit__input' name='city' value={warehouseDetails.city} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.city ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Country</h3>
                        <input className='warehouse-edit__input warehouse-edit__input--last-row' name='country' value={warehouseDetails.country} onChange={handleFormChange}></input>
                        <div className={fieldErrorWarehouse.country ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                    </div>
                    <div className='warehouse-edit__right'>
                        <h2 className='warehouse-edit__title'>Contact Details</h2>

                        <h3 className='warehouse-edit__subtitle' >Contact Name</h3>
                        <input className='warehouse-edit__input' name='contact.name' value={contactDetails.name} onChange={handleFormChange}></input>
                        <div className={fieldErrorContact.name ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Position</h3>
                        <input className='warehouse-edit__input' name='contact.position' value={contactDetails.position} onChange={handleFormChange}></input>
                        <div className={fieldErrorContact.position ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Phone Number</h3>
                        <input className='warehouse-edit__input' name='contact.phone' value={contactDetails.phone} onChange={handleFormChange}></input>
                        <div className={fieldErrorContact.phone ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>

                        <h3 className='warehouse-edit__subtitle' >Email</h3>
                        <input className='warehouse-edit__input' name='contact.email' value={contactDetails.email} onChange={handleFormChange}></input>
                        <div className={fieldErrorContact.email ? 'warehouse-edit__error' : 'warehouse-edit__hidden'}>
                            <img src={errorIcon} alt='' />
                            <p>This field is required</p>
                        </div>
                    </div>
                </div>
                <div className='warehouse-edit__button-wrapper'>
                    <button type='button' className='warehouse-edit__button warehouse-edit__button-cancel' onClick={handleCancel} >Cancel</button>
                    <button type="submit" className='warehouse-edit__button warehouse-edit__button-save' >Save</button>
                </div>
            </form>
        </section>
    );
}

export default EditWarehouse;