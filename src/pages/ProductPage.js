import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { cartAddItem } from '../actions/actionCreators';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Preloader from "../components/Preloader";

const ProductPage = () => {
  const actualParams = useParams();
  const url = `http://localhost:7070/api/items/${actualParams.id}`;
  const [item, setItem] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkSize = value => {
    setSelectedSize(value);
  }

  const quantityMinus = () => {
    setQuantity(prevValue => prevValue - 1);
  }

  const quantityPlus = () => {
    setQuantity(prevValue => prevValue + 1);
  }

  const addToCart = () => {
    const itemToCart = {
      id: actualParams.id,
      title: item.title,
      price: item.price,
      size: selectedSize,
      quantity: quantity
    }

    dispatch(cartAddItem(itemToCart));
    navigate("/diploma-react/cart");
  }

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        setItem(result);
      }
    );
  }, []);

  return (
    <section className="catalog-item">

    {
      item ? (
        <>
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item.images[0]}
                className="img-fluid" alt={item.title} />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{item.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{item.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{item.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{item.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{item.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{item.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии: {item.sizes.map(
                    size => 
                    size.avalible &&
                    <span
                      key={nanoid()}
                      className={(selectedSize === size.size ? "selected " : "") + "catalog-item-size"}
                      onClick={() => checkSize(size.size)}
                    >
                      {size.size}
                    </span>
                  )}
                </p>
                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                  <button
                    {...(quantity === 1 && {disabled:true})}
                    className="btn btn-secondary"
                    onClick={quantityMinus}
                  >
                    -
                  </button>
                  <span className="btn btn-outline-primary">
                    {quantity}
                  </span>
                  <button
                    {...(quantity === 10 && {disabled:true})}
                    className="btn btn-secondary"
                    onClick={quantityPlus}
                  >
                    +
                  </button>
                </span>
                </p>
              </div>
              <button
                className="btn btn-danger btn-block btn-lg"
                {...(!selectedSize && {disabled:true})}
                onClick={addToCart}
              >
                В корзину
              </button>
            </div>
          </div>
        </>
      ) : <Preloader/>
    }
    </section>
  )
}

export default ProductPage;