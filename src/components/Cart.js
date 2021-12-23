import { ReactComponent as Close } from "../images/close.svg";
import plantList from "./plantList";
import "../styles/cart.css";
import { useState } from "react";

const Cart = () => {
  const [cart, setCart] = useLocalStorage("cart", "");
  return (
    <div className="cart shop">
      <h1>Cart</h1>
      {[...cart].map((item) => {
        return (
          <CartItem
            setCart={setCart}
            key={item.id}
            id={item.id}
            amount={item.quantity}
          />
        );
      })}
      <CartTotal cart={cart} />
    </div>
  );
};

export default Cart;

const CartItem = (props) => {
  const setCart = props.setCart;
  const selected = plantList.filter(
    (plant) => plant.id === parseInt(props.id)
  )[0];
  function increaseAmount(id) {
    let newAmount = props.amount + 1;
    updateCart(id, newAmount);
  }
  function decreaseAmount(id) {
    let newAmount = props.amount - 1;
    if (newAmount === 0) {
      deleteItem(id);
      return;
    }
    updateCart(id, newAmount);
  }
  function updateCart(id, amount) {
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
      setCart(cart);
    } else {
      let newCart = [newItem];
      setCart(newCart);
    }
  }
  const deleteItem = (id) => {
    let storage = localStorage.getItem("cart");
    let cart = JSON.parse(storage);
    const oldArray = cart;
    const selectedIndex = oldArray.findIndex((job) => job.id === id);
    const newArray = [
      ...oldArray.slice(0, selectedIndex),
      ...oldArray.slice(selectedIndex + 1),
    ];
    setCart(newArray);
  };
  return (
    <div className="cart-item">
      <div className="image-container cart-image-container">
        <img src={selected.img} alt={selected.name} />
      </div>
      <div className="cart-details">
        <div className="item-info">
          <h3>{selected.name}</h3>
          <div className="price-amount">{selected.price * props.amount}</div>
        </div>
        <div className="horizontal">
          <div className="quantity">
            <button
              className="decreaseAmount"
              onClick={() => {
                decreaseAmount(props.id);
              }}
            >
              -
            </button>
            <div>{props.amount}</div>
            <button
              className="increaseAmount"
              onClick={() => {
                increaseAmount(props.id);
              }}
            >
              +
            </button>
          </div>
          <Close
            onClick={() => {
              deleteItem(props.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const CartTotal = (cart) => {
  const total = getTotal();
  return (
    <div className="total">
      <div className="horizontal subtotal">
        <h3>Subtotal:</h3>
        <div className="price-amount">{total}</div>
      </div>
      <div className="horizontal tax">
        <h3>Tax: </h3>
        <div className="price-amount">0</div>
      </div>
      <div className="horizontal total">
        <h3>Total: </h3>
        <div className="price-amount">{total}</div>
      </div>
    </div>
  );
};

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

// function from usehooks.com
function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

function getTotal() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  let total = 0;
  for (let item of cart) {
    let id = item.id;
    let selected = plantList.filter((plant) => plant.id === parseInt(id))[0];
    total += selected.price * item.quantity;
  }
  return total;
}
