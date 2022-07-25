import './AddWarehouse.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import arrowIcon from '../../Assets/Icons/arrow_back-24px.svg';
import warningIcon from '../../Assets/Icons/error-24px.svg';
import { emailValidator, phoneValidator } from '../Helper/Helper';
import { useState } from 'react';

const AddWarehouse = () => {
  const [inputState, setInputState] = useState([]);
  const [fieldRequiredMessage, setFieldRequiredMessage] = useState({});

  const errorHandler = (e) => {
    const form = e.target.value;

    setInputState({ ...inputState, [e.target.name]: form });

    // updating state for error message display

    if (form.value !== '') {
      setFieldRequiredMessage({ ...fieldRequiredMessage, [e.target.name]: e.target.value });
    } else if (form.value === '') {
      setFieldRequiredMessage({ ...fieldRequiredMessage, [e.target.name]: undefined });
    }
  };

  const dataHandler = (e) => {
    e.preventDefault();

    const phoneChecker = phoneValidator(inputState.phone);
    // Phone validation

    // E-mail validator
    const emailChecker = emailValidator(inputState.email);

    // Axios post request
    if (phoneChecker && emailChecker) {
      const warehouseData = {
        name: e.target[0].value,
        address: e.target[1].value,
        city: e.target[2].value,
        country: e.target[3].value,
        contact: {
          name: e.target[4].value,
          position: e.target[5].value,
          phone: e.target[6].value,
          email: e.target[7].value,
        },
      };

      const warehousePostCall = axios.post('http://localhost:8080/warehouse', warehouseData);
      warehousePostCall
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section className='add-warehouse__wrapper'>
        <div className='add-warehouse__add-wh-header'>
          <Link to='/warehouse'>
            <img src={arrowIcon} alt=''/>
          </Link>
          <h1 className='add-warehouse__add-wh-heading'>Add a New Warehouse</h1>
        </div>
        <form className='add-warehouse__wh-details' onSubmit={dataHandler}>
          <div className='add-warehouse__details-container'>
            <div className='add-warehouse__warehouse-form'>
              <h2 className='add-warehouse__warehouse-heading'>Warehouse details</h2>
              <label className='wh-form__label' htmlFor='name-form'>
                Warehouse name
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.warehouseName === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='name-form'
                name='warehouseName'
                placeholder='Warehouse Name'
              />
              <div
                className={
                  fieldRequiredMessage.warehouseName === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='street-form'>
                Street Address
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.address === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='street-form'
                name='address'
                placeholder='Street Address'
              />
              <div
                className={
                  fieldRequiredMessage.address === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='city'>
                City
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.city === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='city-form'
                name='city'
                placeholder='City'
              />
              <div
                className={fieldRequiredMessage.city === undefined ? 'error-msg' : 'hidden-err-msg'}
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='country-form'>
                Country
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.country === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='country-form'
                name='country'
                placeholder='Country'
              />
              <div
                className={
                  fieldRequiredMessage.country === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
            </div>

            <div className='add-warehouse__contact-form'>
              <h2 className='add-warehouse__contact-heading'>Contact details</h2>
              <label className='wh-form__label' htmlFor='contact-name-form'>
                Contact name
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.contact === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='contact-name-form'
                name='contact'
                placeholder='Contact Name'
              />
              <div
                className={
                  fieldRequiredMessage.contact === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='position-form'>
                Position
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.position === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='position-form'
                name='position'
                placeholder='Position'
              />
              <div
                className={
                  fieldRequiredMessage.position === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='phone-number-form'>
                Phone number
              </label>
              <input
                type='tel'
                className={
                  fieldRequiredMessage.phone === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='phone-number-form'
                name='phone'
                placeholder='Phone Number'
              />
              <div
                className={
                  fieldRequiredMessage.phone === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
              <label className='wh-form__label' htmlFor='email-form'>
                Email
              </label>
              <input
                type='text'
                className={
                  fieldRequiredMessage.email === undefined
                    ? 'add-wh__form-error'
                    : 'add-wh__form before-form'
                }
                onChange={errorHandler}
                id='email-form'
                name='email'
                placeholder='Email'
              />
              <div
                className={
                  fieldRequiredMessage.email === undefined ? 'error-msg' : 'hidden-err-msg'
                }
              >
                <img src={warningIcon} className='warning-icon' alt='warning' />
                <p className='warning-text'>This field is required</p>
              </div>
            </div>
          </div>
          <div className='add-warehouse__button-section'>
            <Link className='cancel-link' to='/warehouse'>
              Cancel
            </Link>

            <input type='submit' id='submit-button' value='+ Add Warehouse' />
          </div>
        </form>
      </section>
    </>
  );
};
export default AddWarehouse;
