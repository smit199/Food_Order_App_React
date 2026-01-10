import { useContext } from 'react'
import styles from './CartFoods.module.css'
import CartItem from './CartItem'
import CartContext from '../../Context/cart-context'

const CartFoods = () => {

    // const cartFoods = [
    //     {
    //         id: 1,
    //         name: 'Pizza',
    //         amount: 2,
    //         price: 122
    //     },
    //     {
    //         id: 2,
    //         name: 'Manchurian Dry',
    //         amount: 2,
    //         price: 199
    //     }
    // ]

    const cartCtx = useContext(CartContext);

    return (
        <div className={styles['cart-food-items']}>
            {cartCtx.cartItems.map(item => {
                return <CartItem key={item.id} id={item.id} name={item.name} amount={item.amount} price={item.price}></CartItem>
            })}
        </div>
    )
}

export default CartFoods;