import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/item.css";
import plantList from "./plantList";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";

function Item() {
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const selected = plantList.filter((plant) => plant.id === parseInt(id))[0];

  function increaseAmount() {
    setAmount(amount + 1);
  }
  function decreaseAmount() {
    if (amount === 0) {
      return;
    }
    setAmount(amount - 1);
  }

  return (
    <div className="item">
      <div className="top">
        <div className="image-container">
          <img src={selected.img} alt={selected.name} />
        </div>
        <Link to="/shop" className="back">
          {<BackArrow />}
        </Link>
      </div>
      <div className="item-details">
        <h1>{selected.name}</h1>
        <div className="shop-item-price">
          <div>Price: </div>
          <div className="price-amount">{selected.price}</div>
        </div>
        <div className="purchase">
          <div className="price-amount">{selected.price * amount}</div>
          <div className="quantity">
            <button className="decreaseAmount" onClick={decreaseAmount}>
              -
            </button>
            <div>{amount}</div>
            <button className="increaseAmount" onClick={increaseAmount}>
              +
            </button>
          </div>
          <button className="addToCart">Add</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
