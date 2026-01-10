import { useContext } from 'react';
import Button from '../UI/Button';
import styles from './CartItem.module.css'
import CartContext from '../../Context/cart-context';

const CartItem = (props) => {

    const cartCtx = useContext(CartContext);

    const increaseAmount = () => {
        cartCtx.increaseAmount(props.id);
    }

    const decreaseAmount = () => {
        // console.log(typeof cartCtx.cartItems.find(item => item.id === props.id).amount)
        if(cartCtx.cartItems.find(item => item.id === props.id).amount === 1) {
            cartCtx.removeItemFromCart(props.id)
        }
        else {
            cartCtx.decreaseAmount(props.id);
        }
    }

    return (
        <div className={styles['cart-item']}>
            <div className={styles['cart-item-detail']}>
                <div className={styles['cart-item-name']}><h2>{props.name}</h2></div>
                <div className={styles['cart-item-price-amount']}>
                    <p>&#x20b9; {props.price}</p>
                    <div>x {props.amount}</div>
                </div>
            </div>
            <div className={styles['amount-buttons']}>
                <Button className='amount-inc-dec-button' onClick={decreaseAmount}>-</Button>
                <Button className='amount-inc-dec-button' onClick={increaseAmount}>+</Button>
            </div>
        </div>
    )
}

export default CartItem;