import "../styles/stock.css";
import fetchPlantList from "../api/fetchPlantList";
import { useQuery, useQueryClient, useMutation } from "react-query";
import StockList from "./StockList";
import Loading from "../components/popups/loading";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import deletePlant from "../api/deletePlant";
import { findAtIndexAndDelete } from "./helperFunctions/findIdDelete";

const Stock = () => {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, isError, data, error } = useQuery(
    "plantList",
    fetchPlantList,
    {
      refetchOnWindowFocus: false,
    }
  );
  const deletePlantMutation = useMutation(deletePlant, {
    // Optimistically update the cache value an mutate, but store the old value and return it so its accessible on error
    onMutate: async (id) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries("plantList");

      // Snapshot the previous value
      const previous_value = queryClient.getQueryData("plantList");

      // Optimistically update to the new value
      queryClient.setQueryData("plantList", (oldData) => {
        const newArray = findAtIndexAndDelete(oldData, id);
        return newArray;
      });
      // Return a context obj with snapshot value
      return { previous_value };
    },
    // On Failure, roll back to the previous value
    onError: (err, variables, context) => {
      queryClient.setQueryData("plantList", context.previous_value);
    },
    // After success or failure, refresh the todo query
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries("plantList");
    },
  });

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
  if (isFetching) {
    return (
      <main className="stock-container">
        <Loading />
        <Link to="/admin" className="back padded">
          {<BackArrow />}
        </Link>
        <h1>Plant List</h1>
        <StockList stockList={data} delete={deletePlantMutation.mutate} />
      </main>
    );
  }
  // Response is good so Continue
  return (
    <main className="stock-container">
      <Link to="/admin" className="back padded">
        {<BackArrow />}
      </Link>
      <h1>Plant List</h1>
      <StockList stockList={data} delete={deletePlantMutation.mutate} />
    </main>
  );
};

export default Stock;
