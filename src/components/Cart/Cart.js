import React, { useContext, useState } from "react";
import styles from './Cart.module.css'
import Button from "../UI/Button";
import CartFoods from "./CartFoods";
import CartContext from "../../Context/cart-context";
import Order from "../Orders/Order";

const Cart = (props) => {

    const [showOrderForm, setShowOrderForm] = useState(false);
    const cartCtx = useContext(CartContext);

    const openOrderForm = () => {
        setShowOrderForm(true);
    }

    const closeOrderForm = () => {
        setShowOrderForm(false);
    }

    return (
        <React.Fragment>
            <div className={styles.backdrop}></div>
            { showOrderForm && <Order onCloseOrderForm={closeOrderForm}></Order> }
            <div className={styles['cart-container']}>
                <CartFoods></CartFoods>
                <div className={styles['total-amount']}>
                    <h2>Total Amount</h2>
                    <h2>&#x20b9; {cartCtx.totalAmount}</h2>
                </div>
                <div className={styles['buttons']}>
                    <Button className='order-button' onClick={openOrderForm} disabled={cartCtx.cartItems.length === 0}>Order</Button>
                    <Button className='close-button' onClick={props.onCloseCart}>Close</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Cart;