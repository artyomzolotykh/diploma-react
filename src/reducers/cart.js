import {CART_ADD_ITEM, CART_GET_ITEMS, CART_REMOVE_ITEM, CART_REMOVE_ALL} from '../actions/actionTypes';

const initialState = [];

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const {item} = action.payload;
      let foundedQuantity = 0;
      let newItems = [];

      if (state.length > 0) {
        newItems = state.map(itemInCart => {
          if (
            (itemInCart.id === item.id) && 
            (itemInCart.size === item.size)
          ) {
            foundedQuantity = itemInCart.quantity;
            return {
              id: item.id,
              title: item.title,
              price: item.price,
              size: item.size,
              quantity: item.quantity + foundedQuantity,
            }
          }
          return itemInCart;
        });

        if (!foundedQuantity) {
          newItems = [...state, item];
        }
      } else {
        newItems = [item];
      }

      localStorage.setItem('itemsInCart', JSON.stringify(newItems));

      return newItems;

    case CART_GET_ITEMS:
      if (localStorage.getItem('itemsInCart')) {
        if (localStorage.getItem('itemsInCart').length) {
          return JSON.parse(localStorage.getItem('itemsInCart'));
        } else {
          return state;
        }
      }
    
    case CART_REMOVE_ITEM:
      const itemsFromRemove = state.filter(item => item.id !== action.payload.id);

      localStorage.setItem('itemsInCart', JSON.stringify(itemsFromRemove));

      return itemsFromRemove;

    case CART_REMOVE_ALL:
      return [];

    default:
      return state;
  }
}