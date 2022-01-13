import { useSelector, useDispatch } from 'react-redux';
import { cartRemoveItem } from '../actions/actionCreators';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Cart = () => {
  const itemsCart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const removeItem = id => {
    dispatch(cartRemoveItem(id));
  }

  useEffect(() => {
    setTotal(0);
    itemsCart.map(itemInCart => {
      setTotal(oldValue => oldValue + itemInCart.price * itemInCart.quantity);
    });
  }, [itemsCart]);

  return (
    <section className="cart">
      <h2 className="text-center">Корзина</h2>
      {itemsCart.length ? 
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Размер</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Стоимость</th>
            <th scope="col">Итого</th>
            <th scope="col">Действия</th>
          </tr>
        </thead>
        <tbody>
          {itemsCart.map((itemInCart, index) => 
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td><NavLink to={`/diploma-react/catalog/${itemInCart.id}`}>{itemInCart.title}</NavLink></td>
              <td>{itemInCart.size}</td>
              <td>{itemInCart.quantity}</td>
              <td>{itemInCart.price.toLocaleString('ru-RU')} руб.</td>
              <td>{(itemInCart.price * itemInCart.quantity).toLocaleString('ru-RU')} руб.</td>
              <td>
                <button 
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeItem(itemInCart.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          )}
          <tr>
            <td colSpan="5" className="text-right">Общая стоимость</td>
            <td>{total && total.toLocaleString('ru-RU')} руб.</td>
          </tr>
        </tbody>
      </table> :
      <p>Корзина пуста</p>}
    </section>
  )
}

export default Cart;