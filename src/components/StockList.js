import { useState } from "react";
import { Link } from "react-router-dom";

export default function StockList(props) {
  const [stockList, setStockList] = useState(props.stockList || []);
  const [priceOrder, setPriceOrder] = useState("none");
  const [stockOrder, setStockOrder] = useState("none");
  const [titleOrder, setTitleOrder] = useState("asc");
  return (
    <div className="stock-list">
      <StockTitle
        name="Plant Name"
        stock="Stock"
        price="Price"
        priceOrder={priceOrder}
        stockOrder={stockOrder}
        titleOrder={titleOrder}
        sortTitle={() => {
          setStockList(sortList(stockList, "name", titleOrder));
          setTitleOrder(titleOrder === "asc" ? "des" : "asc");
        }}
        sortPrice={() => {
          setStockList(sortList(stockList, "price", priceOrder));
          setPriceOrder(priceOrder === "asc" ? "des" : "asc");
        }}
        sortStock={() => {
          setStockList(sortList(stockList, "stock", stockOrder));
          setStockOrder(stockOrder === "asc" ? "des" : "asc");
        }}
      />
      {stockList.map((plant) => {
        return (
          <StockItem
            name={plant.name}
            stock={plant.stock}
            price={plant.price}
            key={plant._id}
          />
        );
      })}
      <NewPlant />
    </div>
  );
}

const StockItem = (params) => {
  return (
    <div className="stock-list-item">
      <h4>{params.name}</h4>
      <div>{params.price}</div>
      <div>{params.stock}</div>
    </div>
  );
};
const StockTitle = (params) => {
  return (
    <div className="stock-list-item title">
      <div onClick={params.sortTitle} className={params.titleOrder}>
        {params.name}
      </div>
      <div onClick={params.sortPrice} className={params.priceOrder}>
        {params.price}
      </div>
      <div onClick={params.sortStock} className={params.stockOrder}>
        {params.stock}
      </div>
    </div>
  );
};
const NewPlant = () => {
  return (
    <Link to="/admin/newPlant" className="add-new-plant btn">
      + Add a New Plant
    </Link>
  );
};

function sortList(list, param, order) {
  let newList;
  try {
    if (order === "asc") {
      newList = [...list].sort((a, b) => (a[param] > b[param] ? 1 : -1));
    } else {
      newList = [...list].sort((a, b) => (a[param] < b[param] ? 1 : -1));
    }
  } catch (err) {
    console.log(err);
    return list;
  }
  return newList;
}
