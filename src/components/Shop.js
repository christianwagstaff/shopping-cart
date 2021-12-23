import plantList from "./plantList";
import "../styles/shop.css";

// Shuffle The Lists on Load
const succulentList = shuffleArray(
  plantList.filter((plant) => plant.tags.includes("succulent"))
);
const flowering = shuffleArray(
  plantList.filter((plant) => plant.tags.includes("flowering"))
);
const expensive = shuffleArray(
  plantList.filter((plant) => plant.tags.includes("expensive"))
);

const allPlants = shuffleArray(plantList)

const Shop = () => {
  console.log(plantList);
  return (
    <div className="shop">
      <h1>Shop</h1>
      <ShopSection title="Popular" list={expensive} />
      <ShopSection title="Succulents" list={succulentList} />
      <ShopSection title="Flowering Plants" list={flowering} />
      <ShopSection title="See All" list={allPlants} />
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
            <ShopItem
              key={item.id}
              name={item.name}
              img={item.img}
              price={item.price}
            />
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

function shuffleArray(arr) {
  // Fisher-Yates Shuffle Algorithm for Shuffling an Array
  // We duplicate the array as to not mutate the original
  const copy = arr.slice(0);
  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
