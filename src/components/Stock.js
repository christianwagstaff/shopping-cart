import "../styles/stock.css";
import fetchPlantList from "../api/fetchPlantList";
import { useQuery } from "react-query";
import StockList from "./StockList";

const Stock = () => {
  const { isLoading, isError, data, error } = useQuery(
    "plantList",
    fetchPlantList
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // Response is good so Continue
  return (
    <main className="stock-container">
      <h1>Stock List</h1>
      <StockList stockList={data}/>
    </main>
  );
};

export default Stock;