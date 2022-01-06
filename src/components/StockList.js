import { useState } from "react";
import { Link } from "react-router-dom";

export default function StockList(props) {
  const [stockList, setStockList] = useState(
    sortList(props.stockList, "name", "asc") || []
  );
  const [priceOrder, setPriceOrder] = useState("none");
  const [stockOrder, setStockOrder] = useState("none");
  const [titleOrder, setTitleOrder] = useState("desc");
  return (
    <div className="stock-list">
      <StockTitle
        name="Name"
        stock="Stock"
        price="Price"
        priceOrder={priceOrder}
        stockOrder={stockOrder}
        titleOrder={titleOrder}
        sortTitle={() => {
          setStockList(sortList(stockList, "name", titleOrder));
          setTitleOrder(titleOrder === "asc" ? "desc" : "asc");
          setStockOrder("none");
          setPriceOrder("none");
        }}
        sortPrice={() => {
          setStockList(sortList(stockList, "price", priceOrder));
          setPriceOrder(priceOrder === "asc" ? "desc" : "asc");
          setStockOrder("none");
          setTitleOrder("none");
        }}
        sortStock={() => {
          setStockList(sortList(stockList, "stock", stockOrder));
          setStockOrder(stockOrder === "asc" ? "desc" : "asc");
          setTitleOrder("none");
          setPriceOrder("none");
        }}
      />
      {stockList.map((plant) => {
        return (
          <StockItem
            name={plant.name}
            stock={plant.stock}
            price={plant.price}
            key={plant._id}
            id={plant._id}
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
      <Link to="/admin/plants/edit" className="edit" state={{ id: params.id }}>
        <i className="far fa-edit edit" />
      </Link>
    </div>
  );
};
const StockTitle = (params) => {
  return (
    <div className="stock-list-item title">
      <div onClick={params.sortTitle} className="horizontal left">
        <h3>{params.name}</h3>
        <i className={faSortIcons(params.titleOrder)}></i>
      </div>
      <div onClick={params.sortPrice} className="horizontal left">
        <h3>{params.price}</h3>
        <i className={faSortIcons(params.priceOrder)}></i>
      </div>
      <div onClick={params.sortStock} className="horizontal left">
        {" "}
        <h3>{params.stock}</h3>
        <i className={faSortIcons(params.stockOrder)}></i>
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

function faSortIcons(order) {
  if (order === "desc") {
    return "fas fa-angle-up";
  } else if (order === "asc") {
    return "fas fa-angle-down";
  }
}
