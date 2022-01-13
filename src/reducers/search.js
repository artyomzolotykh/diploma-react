import {CHANGE_SEARCH} from '../actions/actionTypes';

const initialState = '';

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      const {value} = action.payload;
      return value;

    default:
      return state;
  }
}