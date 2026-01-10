import React, { useState } from 'react';
import MainHeader from './components/Header/MainHeader';
import Message from './components/Food/Message';
import FoodMenu from './components/Food/FoodMenu';
import Cart from './components/Cart/Cart';

function App() {

  const [showCart, setShowCart] = useState(false);

  const openCart = () => {
    setShowCart(true);
  }

  const closeCart = () => {
    setShowCart(false);
  }

  return (
    <React.Fragment>
      {console.log(showCart)}
      {showCart && <Cart onCloseCart={closeCart}/>}
      <MainHeader onOpenCart={openCart}></MainHeader>
      <Message></Message>
      <FoodMenu></FoodMenu>
    </React.Fragment>
  );
}

export default App;
