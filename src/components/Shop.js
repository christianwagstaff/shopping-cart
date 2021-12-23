import plantList from "./plantList";
import "../styles/shop.css";

const Shop = () => {
  console.log(plantList);
  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="item-container">
        {plantList.map((item) => {
          return (
            <ShopItem name={item.name} img={item.img} price={item.price} />
          );
        })}
      </div>
      <div className="item-container">
        {plantList.map((item) => {
          return (
            <ShopItem name={item.name} img={item.img} price={item.price} />
          );
        })}
      </div>
    </div>
  );
};

const ShopItem = (props) => {
  return (
    <div className="shop-item">
      <h1>{props.name}</h1>
      <div className="shop-item-img">
        <img src={props.img} alt={props.name} />
      </div>
      <div className="shop-item-price">
        <div>Price: </div>
        <div className="price-amount">{props.price}</div>
      </div>
    </div>
  );
};

export default Shop;
