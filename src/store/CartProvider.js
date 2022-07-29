import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {

    let updatedItems = [...state.items]; // new array
    const existingItmIdx = state.items.findIndex( itm => itm.id === action.item.id );
    const existingItm = state.items[existingItmIdx];
    let updatedTotalAmount;
    if (existingItm) {
      const updatedItem = { ...existingItm, amount: existingItm.amount + 1 };
      updatedItems[existingItmIdx] = updatedItem;
      updatedTotalAmount = state.totalAmount + existingItm.price;
    } else {
      updatedItems.push(action.item) // new array as well.
      updatedTotalAmount = state.totalAmount + action.item.price * 1;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    let updatedItems = [...state.items]; // new array
    const existingItmIdx = state.items.findIndex( itm => itm.id === action.id );
    const existingItm = state.items[existingItmIdx];
    let updatedTotalAmount;
    if (existingItm.amount !== 1) {
      const updatedItem = { ...existingItm, amount: existingItm.amount - 1 };
      updatedItems[existingItmIdx] = updatedItem;
      updatedTotalAmount = state.totalAmount - existingItm.price;
    } else {
      updatedTotalAmount = state.totalAmount - existingItm.price; // this line must come before removing existinItm.
      updatedItems = state.items.filter(item => item.id !== action.id);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if (action.type === 'CLEAR') {
    return defaultCartState;
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR'})
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
