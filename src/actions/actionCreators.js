import { CART_ADD_ITEM, CART_GET_ITEMS, CART_REMOVE_ITEM, CHANGE_SEARCH, CART_REMOVE_ALL } from "./actionTypes";

export function cartAddItem(item) {
  return {type: CART_ADD_ITEM, payload: {item}}
}

export function cartGetItems() {
  return {type: CART_GET_ITEMS}
}

export function cartRemoveItem(id) {
  return {type: CART_REMOVE_ITEM, payload: {id}}
}

export function cartRemoveAll() {
  return {type: CART_REMOVE_ALL}
}

export function changeSearch(value) {
  return {type: CHANGE_SEARCH, payload: {value}}
}