import { ReactComponent as Close } from "../images/close.svg";
import plantList from "./plantList";

const cart = localStorage.getItem("cart");

const Cart = () => {
  console.log(localStorage.getItem("cart"));
  return (
    <div className="cart shop">
      <h1>Cart</h1>
      <CartItem />
      <CartTotal />
    </div>
  );
};

export default Cart;

const CartItem = (props) => {
  return (
    <div className="cart-item">
      <div className="image-container">
        <img src={props.img} alt={props.name} />
      </div>
      <div className="cart-details">
        <h3>{props.name}</h3>
        <div className="price">{props.total}</div>
      </div>
      <div className="quantity">
        <button className="decreaseAmount" onClick={() => {}}>
          -
        </button>
        <div>{props.amount}</div>
        <button className="increaseAmount" onClick={() => {}}>
          +
        </button>
      </div>
      <Close />
    </div>
  );
};

const CartTotal = () => {
  return <div>Cart Total</div>;
};
