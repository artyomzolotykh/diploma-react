import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { cartRemoveAll } from '../actions/actionCreators';
import Preloader from './Preloader';

const Order = () => {
  const itemsCart = useSelector(state => state.cart);
  const [errorValdation, setErrorValdation] = useState('');
  const [loaded, setLoaded] = useState(true);
  const [orderSent, setOrderSent] = useState(false);
  const dispatch = useDispatch();

  const sendOrder = (e) => {
    e.preventDefault();

    const formPhone = e.target[0].value;
    const formAddress = e.target[1].value;
    const formAggree = e.target[2].checked;

    if (formAggree && formPhone && formAddress) {
      setLoaded(false);
      setErrorValdation('');

      const order = {
        "owner": {
          "phone": formPhone,
          "address": formAddress,
        },
        "items": itemsCart
      }

      console.log(order);

      fetch('http://localhost:7070/api/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        () => {
          dispatch(cartRemoveAll());
          setLoaded(true);
          setOrderSent(true);

          setTimeout(() => setOrderSent(false), 3000);
        }
      );
    } else {
      setErrorValdation('заполните все поля');
    }
  }

  return (
    <>
      {itemsCart.length ?
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
          <form className="card-body" onSubmit={sendOrder}>
            <div className="form-group">
              {errorValdation && <p style={{color:'red'}}>{errorValdation}</p>}
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" placeholder="Ваш телефон" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" id="address" placeholder="Адрес доставки" />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" />
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
            </div>
            <button type="submit" className="btn btn-outline-secondary">Оформить</button>
          </form>
        </div>
      </section>:
      <div></div>}

      {orderSent ? <p style={{color:'green'}}>Заказ отправлен</p> : !loaded ? <Preloader/> : <div></div>}
    </>
  )
}

export default Order;