import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const CartContex = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(0);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.productId === product.productId);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + parseFloat(product.price) * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }
    setShowCart(false);
    toast.success(`Item added to the cart.`);
  } 

  const toggleCartItemQty = (id, value) => {
    foundProduct = cartItems.find((item) => item.productId === id);
    index = cartItems.findIndex((product) => product.productId === id);
    let price = parseFloat(foundProduct.price)
  
    if (value === "add") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity: foundProduct.quantity + 1 };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => Math.max(0, prevTotalPrice + price));
      setTotalQuantities((prevTotalQuantities) => Math.max(0, prevTotalQuantities + 1));
    } else if (value === "sub") {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) => {
          if (item.productId === id) {
            return { ...item, quantity: foundProduct.quantity - 1 };
          }
          return item;
        })
      );
      setTotalPrice((prevTotalPrice) => Math.max(0, prevTotalPrice - price));
      setTotalQuantities((prevTotalQuantities) => Math.max(0, prevTotalQuantities - 1));
    }
  };

  const addQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const subQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 0;
      return prevQty - 1;
    });
  };

  const deleteFromCart = (product) => {
    foundProduct = cartItems.find(
      (item) => item.productId === product.productId
    );
    let price = parseFloat(foundProduct.price);
    const newCartItems = cartItems.filter(
      (item) => item.productId !== product.productId
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - price * foundProduct.quantity
    );
    setTotalQuantities(prevTotalQtys => prevTotalQtys - foundProduct.quantity);
    setCartItems(newCartItems);
    toast.success('Item Removed From Cart')
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalQuantities(0);
    setTotalPrice(0);
    setShowCart(false);
    navigate("/");
  };

  return (
    <CartContex.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        addQty,
        subQty,
        onAdd,
        deleteFromCart,
        clearCart,
        showCart,
        setShowCart,
        toggleCartItemQty,
        setQty
      }}
    >
      {children}
    </CartContex.Provider>
  );
};

export default CartProvider;
