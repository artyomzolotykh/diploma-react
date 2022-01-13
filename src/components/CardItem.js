import { NavLink } from "react-router-dom";

const CardItem = props => {
  const item = props.item;
  const className = props.className ? props.className : 'card';
  return (
    <div className="col-4">
      <div className={className}>
        <img src={item.images[0]}
          className="card-img-top img-fluid" alt={item.title} />
        <div className="card-body">
          <p className="card-text">{item.title}</p>
          <p className="card-text">{item.price.toLocaleString('ru-RU')} руб.</p>
          <NavLink to={`/diploma-react/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
        </div>
      </div>
    </div>
  )
}

export default CardItem;