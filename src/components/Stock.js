import "../styles/stock.css";
import fetchPlantList from "../api/fetchPlantList";
import { useQuery } from "react-query";
import StockList from "./StockList";
import Loading from "../components/popups/loading";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";
import { Link } from "react-router-dom";

const Stock = () => {
  const { isLoading, isError, data, error } = useQuery(
    "plantList",
    fetchPlantList
  );
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
  // Response is good so Continue
  return (
    <main className="stock-container">
      <Link to="/admin" className="back padded">
        {<BackArrow />}
      </Link>
      <h1>Plant List</h1>
      <StockList stockList={data} />
    </main>
  );
};

export default Stock;
