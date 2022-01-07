import "../styles/shop.css";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import fetchPlantList from "../api/fetchPlantList";
import { useEffect } from "react";
import Loading from "./popups/loading";
import PlantIcon from "../images/plants/flowers.png"

const Shop = () => {
  const { isLoading, isError, data, error, remove } = useQuery(
    "plantList",
    fetchPlantList,
    {
      staleTime: 60 * 1000, // 1 minute
      cacheTime: 60 * 1000 * 10, // 10 minutes
    }
  );
  useEffect(() => {
    // When this component unmounts, call it
    return () => remove();
  }, [remove]);
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // We can assume at this point data is successful
  const succulentList = shuffleArray(
    data.filter((plant) => plant.category.some((e) => e.name === "succulent"))
  );
  const flowering = shuffleArray(
    data.filter((plant) => plant.category.some((e) => e.name === "flowering"))
  );

  const expensive = shuffleArray(
    data.filter((plant) => plant.category.some((e) => e.name === "expensive"))
  );

  const allPlants = shuffleArray(data);

  return (
    <main className="shop">
      <h1>Shop</h1>
      <ShopSection title="Popular" list={expensive} />
      <ShopSection title="Succulents" list={succulentList} />
      <ShopSection title="Flowering Plants" list={flowering} />
      <ShopSection title="See All" list={allPlants} />
    </main>
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
              key={item._id}
              name={item.name}
              // img={item.img}
              price={item.price}
              id={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

const ShopItem = (props) => {
  return (
    <Link to={`/shop/${props.id}`} className="shop-link">
      <div className="shop-item">
        <div className="shop-item-img">
          <img src={props.img || PlantIcon} alt={props.name}/>
        </div>
        <h3>{props.name}</h3>
        <div className="shop-item-price">
          <div>Price: </div>
          <div className="price-amount">{props.price}</div>
        </div>
      </div>
    </Link>
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
