import React, { useContext } from 'react';
import Button from '../UI/Button';
import styles from './MainHeader.module.css';
import CartContext from '../../Context/cart-context';

const MainHeader = (props) => {

    const cartCtx = useContext(CartContext);
    const cartItemCount = cartCtx.cartItems.reduce((count, item) => count + +item.amount, 0);

    return (
        <React.Fragment>
            <div className={styles['header']}>
                <p>ReactMeals</p>
                <Button className='cart-button' onClick={props.onOpenCart}>
                    <p>Your Cart</p>
                    <div className={styles['cart-item-count']}>{cartItemCount}</div>
                </Button>
            </div>
            <div className={styles['main-image']}>
                <img src='../../assets/meals.jpg' alt='meals'></img>
            </div>
        </React.Fragment>
    )
}

export default MainHeader;