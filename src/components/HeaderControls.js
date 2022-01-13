import { useSelector, useDispatch } from 'react-redux';
import { cartGetItems, changeSearch } from '../actions/actionCreators';
import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

const HeaderControls = () => {
  const [hiddenForm, setHiddenForm] = useState(true);
  const [searchArea, setSearchArea] = useState('');
  
  const itemsCart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const toggleSearchForm = () => {
    setHiddenForm(!hiddenForm);
    if (!hiddenForm) {
      dispatch(changeSearch(searchArea));
      setSearchArea('');
    }
  }

  const handleChangeSearchArea = evt => {
    const {value} = evt.target;
    evt.preventDefault();
    setSearchArea(value);
  }

  useEffect(() => {
    dispatch(cartGetItems());
  }, []);

  return (
    <div>
      <div className="header-controls-pics">
        {searchArea ?
          <NavLink to="/diploma-react/catalog" className="header-controls-pic header-controls-search" onClick={toggleSearchForm}></NavLink> :
          <div className="header-controls-pic header-controls-search" onClick={toggleSearchForm}></div>
        }
        <NavLink className="header-controls-pic header-controls-cart" to="/diploma-react/cart">
          {itemsCart.length ? <div className="header-controls-cart-full">{itemsCart.length}</div> : ''}
          <div className="header-controls-cart-menu"></div>
        </NavLink>
      </div>
      <form className={"header-controls-search-form form-inline" + (hiddenForm && ' invisible')} onSubmit={(e) => {e.preventDefault()}}>
        <input
          name="search"
          className="form-control"
          placeholder="Поиск"
          value={searchArea}
          onChange={handleChangeSearchArea}
        />
      </form>
    </div>
  )
}

export default HeaderControls;