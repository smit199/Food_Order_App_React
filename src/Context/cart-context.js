import React from "react";

const CartContext = React.createContext({
    cartItems: [],
    totalAmount: 0,
    addItem: (item) => {},
    increaseAmount: (id) => {},
    decreaseAmount: (id) => {},
    removeItemFromCart: (id) => {}
})

export default CartContext;