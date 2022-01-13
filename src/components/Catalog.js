import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch } from '../actions/actionCreators';
import CardItem from "./CardItem";
import Preloader from "./Preloader";

const Catalog = props => {
  const urlAllItems = 'http://localhost:7070/api/items';
  const urlCategories = 'http://localhost:7070/api/categories';

  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState(0);
  const [offsetItems, setOffsetItems] = useState(6);
  const [showMore, setShowMore] = useState(true);
  const [searchWords, setSearchWords] = useState('');
  const [searchFraze, setSearchFraze] = useState('');
  const [loaded, setLoaded] = useState(false);
  
  const search = useSelector(state => state.search);
  const dispatch = useDispatch();

  const categoryAll = {id: 0, title: "Все"};

  const handleActualCategory = id => {
    let categoryItemsUrl = id === 0 ? urlAllItems : `${urlAllItems}?categoryId=${id}`;

    if (searchWords) {
      const prefix = id === 0 ? '?' : '&';
      categoryItemsUrl += `${prefix}q=${searchWords}`;
    }

    setActualCategory(id);
    setShowMore(true);
    setOffsetItems(6);

    setLoaded(false);
    fetch(categoryItemsUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setLoaded(true);

          if (result.length < 6) {
            setShowMore(false);
          }
        }
      );
  }

  const handleShowMore = () => {

    let categoryItemsUrl =
      actualCategory === 0 ?
      `${urlAllItems}?offset=${offsetItems}` :
      `${urlAllItems}?categoryId=${actualCategory}&offset=${offsetItems}`
    ;

    if (searchWords) {
      categoryItemsUrl += `&q=${searchWords}`;
    }

    setLoaded(false);
    fetch(categoryItemsUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(prevCategories => ([...prevCategories, ...result]));
          setOffsetItems(prevOffset => (prevOffset + 6));
          setLoaded(true);

          if (result.length < 6) {
            setShowMore(false);
          }
        }
      );
  }

  const handleSubmit = e => {
    e.preventDefault();
    const searchFraze = e.target['search'].value;
    dispatch(changeSearch(searchFraze));
  }

  const handleSubmitOnLoad = () => {
    
    setSearchFraze(search);
    setSearchWords(search);

    const searchUrl =
      actualCategory === 0 ?
      `${urlAllItems}?q=${search}` :
      `${urlAllItems}?categoryId=${actualCategory}&q=${search}`
    ;

    setLoaded(false);
    fetch(searchUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setLoaded(true);

          if (result.length < 6) {
            setShowMore(false);
          }
        }
      );
  }

  const handleSearchFraze = evt => {
    setSearchFraze(evt.target.value);
  }

  useEffect(() => {
    setLoaded(false);
    fetch(urlAllItems)
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setLoaded(true);
        }
      );

    fetch(urlCategories)
      .then(res => res.json())
      .then(
        (result) => {
          setCategories([categoryAll, ...result]);
        }
      );
    
    if (search) {
      handleSubmitOnLoad();
    }

  }, [search]);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {
        loaded ? 
        <>
          {
            props.form && 
            <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
              <input
                name="search"
                className="form-control"
                placeholder="Поиск"
                value={searchFraze}
                onChange={handleSearchFraze}
              />
            </form>
          }
          <ul className="catalog-categories nav justify-content-center">
            {categories.map(category =>
              <li className="nav-item" key={category.id}>
                <a
                  className={category.id === actualCategory ? "nav-link active" : "nav-link"}
                  href="javascript:void(0)"
                  onClick={() => handleActualCategory(category.id)}
                >
                  {category.title}
                </a>
              </li>
            )}
          </ul>
          <div className="row">
            {items.map(item => <CardItem key={item.id} item={item} className="card catalog-item-card" />)}
          </div>
          {showMore &&
            <div className="text-center">
              <button className="btn btn-outline-primary" onClick={handleShowMore}>Загрузить ещё</button>
            </div>
          }
        </> :
        <Preloader />
      }
    </section>
  )
}

export default Catalog;