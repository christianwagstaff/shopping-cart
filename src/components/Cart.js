import { ReactComponent as Close } from "../images/close.svg";
import "../styles/cart.css";
import { useState, useEffect } from "react";
import fetchPlantList from "../api/fetchPlantList";
import { useQuery } from "react-query";

const Cart = () => {
  const [cart, setCart] = useLocalStorage("cart", []);
  // const [cart, setCart] = useState([])
  const { isLoading, isError, data, error, remove } = useQuery(
    "plantList",
    fetchPlantList
  );
  useEffect(() => {
    // When this component unmounts, call it
    return () => remove();
  }, [remove]);
  if (isLoading) {
    return <div className="loading">Loading Plants</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="cart shop">
      <h1>Cart</h1>
      <div className="cart-item-container">
        {[...cart].map((item) => {
          return (
            <CartItem
              setCart={setCart}
              key={item.id}
              id={item.id}
              amount={item.quantity}
              plantList={data}
            />
          );
        })}
      </div>
      <CartTotal cart={cart} plantList={data} />
      <Checkout plantList={data} />
    </div>
  );
};

export default Cart;

const CartItem = (props) => {
  const setCart = props.setCart;
  const plantList = props.plantList;
  const selected = plantList.filter(
    (plant) => plant._id === props.id
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
        {/* <img src={selected.img} alt={selected.name} /> */}
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

function CartTotal(props) {
  const total = getTotal(props);
  return (
    <div className="checkout-pricing">
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
}

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

function getTotal(props) {
  console.log(props);
  const cart = props.cart;
  const plantList = props.plantList;
  let total = 0;
  if (cart.length === 0) {
    // if cart is empty return 0
    return total;
  }
  for (let item of cart) {
    let id = item.id;
    let selected = plantList.filter((plant) => {
      return plant._id === id;
    })[0];
    total += selected.price * item.quantity;
  }
  return total;
}

const Checkout = () => {
  return <button className="checkout">Proceed to Payment</button>;
};
