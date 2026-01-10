
import { useState } from "react";
import CartContext from "./cart-context"

const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const addItemToCart = (item) => {

        const index = cartItems.findIndex(food => food.id === item.id)
        
        if(index === -1) {
            setCartItems([
                ...cartItems,
                item
            ])
        }
        else {
            const currentCartItem = cartItems[index];
            const updatedCartItem = {
                ...currentCartItem,
                amount: currentCartItem.amount + item.amount
            }
            let updCartItems = [...cartItems]
            updCartItems[index] = updatedCartItem;
            setCartItems(updCartItems)
        }
        setTotalAmount(totalAmount + item.amount * item.price);
    }

    const increaseAmount = (id) => {
        setCartItems(cartItems.map(item => {
            if(item.id === id) {
                const updatedItem = {
                    ...item,
                    amount: ++item.amount
                }
                return updatedItem
            }
            return item;
        }))
        setTotalAmount(totalAmount + cartItems.find(item => item.id === id).price);
        console.log(cartItems)
    }

    const decreaseAmount = (id) => {
        // if(cartItems.find(item => item.id === id).amount === '1') {
        //     setCartItems(cartItems.filter(item => item.id !== id))
        // }
        setCartItems(cartItems.map(item => {
            if(item.id === id) {
                const updatedItem = {
                    ...item,
                    amount: --item.amount
                }
                return updatedItem
            }
            return item;
        }));
        setTotalAmount(totalAmount - cartItems.find(item => item.id === id).price);
        console.log(cartItems)
    }

    const removeItemFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
        setTotalAmount(totalAmount - cartItems.find(item => item.id === id).price);
        console.log(cartItems);
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            totalAmount,
            addItemToCart,
            increaseAmount,
            decreaseAmount,
            removeItemFromCart,
        }}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;