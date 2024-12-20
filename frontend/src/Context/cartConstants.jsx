// cartConstants.js
export const CART_ACTIONS = {
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CART: "REMOVE_FROM_CART",
    UPDATE_QUANTITY: "UPDATE_QUANTITY",
    CLEAR_CART: "CLEAR_CART",
  };
  
  export const calculateTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  
  export const addToCart = (product) => {
    return {
        type: CART_ACTIONS.ADD_TO_CART,
        payload: {
            id: product.id,
            product: product,
        },
    };
  };
  