import { useEffect, useState } from "react";
import CardItem from "./CardItem";
import Preloader from "./Preloader";

const TopSales = () => {
  const url = 'http://localhost:7070/api/top-sales';
  const [topSales, setTopSales] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setTopSales(result);
        }
      )
  }, [topSales])

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      <div className="row">
        {
          topSales.length ? 
          <>{topSales.map(item => <CardItem key={item.id} item={item} />)}</> :
          <Preloader />
        }
      </div>
    </section>
  )
}

export default TopSales;