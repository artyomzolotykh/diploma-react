import { createStore, combineReducers } from "redux";
import searchReducer from "../reducers/search";
import cartReducer from "../reducers/cart";

const reducer = combineReducers({
  cart: cartReducer,
  search: searchReducer,
});

const store = createStore(reducer);

export default store;