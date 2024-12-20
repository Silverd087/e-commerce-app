import React, { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { CART_ACTIONS, calculateTotalPrice } from "./cartConstants";

// Initial State
const initialState = {
  items: [],
  totalPrice: 0,
};

// Load cart from local storage
const loadCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : initialState;
};

// Reducer Function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize && item.selectedColor === action.payload.selectedColor
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === existingItem.id && item.selectedSize === existingItem.selectedSize && item.selectedColor === existingItem.selectedColor
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      return {
        items: updatedItems,
        totalPrice: calculateTotalPrice(updatedItems),
      };
    }
    case CART_ACTIONS.CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};

// Cart Context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromLocalStorage());

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    console.log("Adding to cart:", item);
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: item,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: id,
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // Don't allow setting quantity less than 1
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity },
    });
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// PropTypes validation for CartProvider
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
