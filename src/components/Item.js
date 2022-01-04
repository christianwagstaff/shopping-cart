import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";

import "../styles/item.css";
import fetchPlant from "../api/fetchPlantById";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";
import { ReactComponent as Checkmark } from "../images/check.svg";

function Item() {
  const [amount, setAmount] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const { id } = useParams();
  const { isLoading, isError, data, error } = useQuery(
    "plantItem",
    () => fetchPlant(id)
  );
  if (isLoading) {
    return <div className="loading">Loading Plants</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // We can assume the data is successful

  function increaseAmount() {
    setAmount(amount + 1);
  }
  function decreaseAmount() {
    if (amount === 0) {
      return;
    }
    setAmount(amount - 1);
  }

  function addToCart() {
    // don't add if amount is 0
    if (amount === 0) return;
    let storage = localStorage.getItem("cart");
    let cart = JSON.parse(storage);
    let newItem = { id: id, quantity: amount };
    if (cart) {
      if (cart.filter((e) => e.id === id).length > 0) {
        let index = cart.findIndex((e) => e.id === id);
        cart = replaceAt(cart, index, newItem);
      } else {
        cart.push(newItem);
      }
      cart = JSON.stringify(cart);
      localStorage.setItem("cart", cart);
    } else {
      let newCart = [newItem];
      let newCartString = JSON.stringify(newCart);
      localStorage.setItem("cart", newCartString);
    }
    setShowConfirm(true);
    setTimeout(() => {
      setShowConfirm(false);
    }, 1000);
  }

  return (
    <main className="item">
      <div className="top">
        <div className="image-container">
          {/* <img src={data.img} alt={data.name} /> */}
        </div>
        <Link to="/shop" className="back">
          {<BackArrow />}
        </Link>
      </div>
      <div className="item-details">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <div className="shop-item-price">
          <div>Price: </div>
          <div className="price-amount">{data.price}</div>
        </div>
        <div className="purchase">
          <div className="price-amount">{data.price * amount}</div>
          <div className="quantity">
            <button className="decreaseAmount" onClick={decreaseAmount}>
              -
            </button>
            <div>{amount}</div>
            <button className="increaseAmount" onClick={increaseAmount}>
              +
            </button>
          </div>
          <button className="addToCart" onClick={addToCart}>
            Add
          </button>
        </div>
      </div>
      {showConfirm ? <AddedToCartPopup /> : null}
    </main>
  );
}

export default Item;

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

const AddedToCartPopup = () => {
  return (
    <div className="popup-wrapper">
      <div className="popup">
        <Checkmark className="confirm" />
      </div>
    </div>
  );
};
