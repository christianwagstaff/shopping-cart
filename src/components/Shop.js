import plantList from "./plantList";
import "../styles/shop.css";

const Shop = () => {
  console.log(plantList);
  return (
    <div className="shop">
      <h1>Shop</h1>
      <ShopSection title="Popular" list={plantList}/>
      <ShopSection title="Succulents" list={plantList}/>
      <ShopSection title="Flowering Plants" list={plantList}/>
    </div>
  );
};

const ShopSection = (props) => {
  return (
    <div className="shop-section">
      <h2>{props.title}</h2>
      <div className="item-container">
        {props.list.map((item) => {
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
      <div className="shop-item-img">
        <img src={props.img} alt={props.name} />
      </div>
      <h3>{props.name}</h3>
      <div className="shop-item-price">
        <div>Price: </div>
        <div className="price-amount">{props.price}</div>
      </div>
    </div>
  );
};

export default Shop;
