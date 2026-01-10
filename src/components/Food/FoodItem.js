import { useContext, useRef, useState } from 'react';
import Button from '../UI/Button';
import styles from './FoodItem.module.css'
import CartContext from '../../Context/cart-context';

const FoodItem = (props) => {

    const [isAmountValid, setIsAmountValid] = useState(false);
    const amountRef = useRef()
    const cartCtx = useContext(CartContext);

    const validateAmount = () => {
        let amount = amountRef.current.value;
        if(amount.trim().length !==0 || amount > 0) setIsAmountValid(true)
    }

    const addToCartHandler = () => {
        // let amount = amountRef.current.value;
        // if(amount.trim().length !==0 || amount > 0) setIsAmountValid(true)
        if(isAmountValid) {
            cartCtx.addItemToCart({
                id: props.id,
                name: props.name,
                price: props.price,
                amount: +amountRef.current.value
            })
        }
        return;
    }

    return(
        <div className={styles['food-item-container']}>
            <div className={styles['food-item-details']}>
                <h4>{props.name}</h4>
                <p>{props.desc}</p>
                <h3>&#x20b9; {props.price}</h3>
            </div>
            <div className={styles['food-item-add']}>
                <input ref={amountRef} type='number' onChange={validateAmount}></input>
                <label>Amount</label>
                <Button onClick={addToCartHandler}>+ Add</Button>
            </div>
        </div>
    )
}

export default FoodItem;