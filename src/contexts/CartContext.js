import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const CartContex = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(0);

  const onAdd = (product, quantity) => {
    const productArray = [{ ...product, quantity }];

    const updatedCartItems = cartItems.map((cartProduct) => {
      if (cartProduct.productId === product.productId) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity,
        };
      }
      return cartProduct;
    });

    setCartItems(updatedCartItems.concat(productArray));
    toast.success(`Item added to cart`);
  };

  const addQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const subQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 0) return 0;
      return prevQty - 1;
    });
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
      }}
    >
      {children}
    </CartContex.Provider>
  );
};

export default CartProvider;
