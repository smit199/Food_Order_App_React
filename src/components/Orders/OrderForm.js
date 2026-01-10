import styles from './OrderForm.module.css'
import Button from '../UI/Button';
import useInput from '../../hooks/use-input';
import { useContext, useState } from 'react';
import CartContext from '../../Context/cart-context';
import axios from 'axios';

const OrderForm = (props) => {

    const cartCtx = useContext(CartContext);
    const [hadSubmitted, setHadSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { 
        value: enteredName, 
        isValueValid: enteredNameIsValid,
        isValueInvalid: nameInputInvalid,
        valueChangeHandler: nameChangeHandler,
        valueInputBlurHandler: nameInputBlurHandler,
        resetInput: resetName
    } = useInput(name => name.trim().length !== 0);

    const { 
        value: enteredEmail, 
        isValueValid: enteredEmailIsValid,
        isValueInvalid: emailInputInvalid,
        valueChangeHandler: emailChangeHandler,
        valueInputBlurHandler: emailInputBlurHandler,
        resetInput: resetEmail
    } = useInput(email => email.includes('@'));

    const { 
        value: enteredMobileNo, 
        isValueValid: enteredMobileIsValid,
        isValueInvalid: mobileInputInvalid,
        valueChangeHandler: mobileChangeHandler,
        valueInputBlurHandler: mobileInputBlurHandler,
        resetInput: resetMobile
    } = useInput(mobile => /^\d{10}$/.test(mobile));

    const { 
        value: enteredAddress, 
        isValueValid: enteredAddressIsValid,
        isValueInvalid: addressInputInvalid,
        valueChangeHandler: addressChangeHandler,
        valueInputBlurHandler: addressInputBlurHandler,
        resetInput: resetAddress
    } = useInput(address => address.trim().length !== 0);

    let isFormValid = false;

    if(enteredNameIsValid && enteredEmailIsValid && enteredMobileIsValid && enteredAddressIsValid) {
        isFormValid = true;
    }

    const orderFood = async () => {
        const items = cartCtx.cartItems.reduce((obj, item) => {
            return {
                ...obj,
                [item.id] : {
                    amount: item.amount
                }
            }
        }, {});

        try {
            const response = await axios.post('https://food-order-app-react-a9f51-default-rtdb.firebaseio.com/Orders.json', {
                    name: enteredName,
                    email: enteredEmail,
                    mobileNo: enteredMobileNo,
                    address: enteredAddress,
                    items,
                    totalAmount: cartCtx.totalAmount,
                    orderDate: new Date()
                });
            console.log(response);
            if(response.status === 200) {
                // alert('Order Succssful');
                setHasError(false)
            }
        }
        catch(error) {
            // alert('something went wrong, try again.')
            setHasError(true);
            console.log(error.message, error.stack);
            return;
        }
        console.log(items)
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        if(!isFormValid) {
            return;
        }
        orderFood();
        // props.onCloseOrderForm();
        setHadSubmitted(true)
        resetName();
        resetEmail();
        resetMobile();
        resetAddress();
    }


    return (
        <>
            { hadSubmitted && !hasError && <div className={styles['order-message']}>
                    <p>Order placed successfully</p>
                    <div className={styles['ok-button']}><Button className='ok-button' onClick={props.onCloseOrderForm}>Ok</Button></div>
                </div>
            }
            { hadSubmitted && hasError && <div className={styles['order-message']}>
                    <p>Something went wrong, try again.</p>
                    <div className={styles['ok-button']}><Button className='ok-button' onClick={props.onCloseOrderForm}>Ok</Button></div>
                </div>
            }
            { !hadSubmitted && !hasError && <form onSubmit={formSubmissionHandler}>
                <div className={`${styles['form-control']} ${nameInputInvalid ? styles['invalid'] : ''}`}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' value={enteredName} onChange={nameChangeHandler} onBlur={nameInputBlurHandler}/>
                    {nameInputInvalid && <p className={styles['error-text']}>Name must not be empty</p>}
                </div>
                <div className={`${styles['form-control']} ${emailInputInvalid ? styles['invalid'] : ''}`}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' value={enteredEmail} onChange={emailChangeHandler} onBlur={emailInputBlurHandler}/>
                    {emailInputInvalid && <p className={styles['error-text']}>Email must include @</p>}
                </div>
                <div className={`${styles['form-control']} ${mobileInputInvalid ? styles['invalid'] : ''}`}>
                    <label htmlFor='mobile'>Mobile No.</label>
                    <input type='text' id='mobile' value={enteredMobileNo} onChange={mobileChangeHandler} onBlur={mobileInputBlurHandler}/>
                    {mobileInputInvalid && <p className={styles['error-text']}>Mobile no must be 10 digit number</p>}
                </div>
                <div className={`${styles['form-control']} ${addressInputInvalid ? styles['invalid'] : ''}`}>
                    <label htmlFor='address'>Address</label>
                    <textarea rows='4' id='address' value={enteredAddress} onChange={addressChangeHandler} onBlur={addressInputBlurHandler}></textarea>
                    {addressInputInvalid && <p className={styles['error-text']}>Address must not be empty</p>}
                </div>
                <div className={styles['buttons']}>
                    <Button className='order-button' disabled={!isFormValid}>Order</Button>
                    <Button className='close-button' onClick={props.onCloseOrderForm}>Cancel</Button>
                </div>
            </form> }
        </>
    )
}

export default OrderForm;