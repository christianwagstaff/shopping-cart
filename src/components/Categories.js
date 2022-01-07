import { useQuery, useMutation, useQueryClient } from "react-query";
import fetchCategories from "../api/fetchCategories";
import CategoryList from "../components/CategoryList";
import Loading from "./popups/loading";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";
import { Link } from "react-router-dom";
import deleteCategory from "../api/deleteCategory";
import { findAtIndexAndDelete } from "./helperFunctions/findIdDelete";

export default function Categories() {
  const queryClient = useQueryClient();
  const { isLoading, isFetching, isError, data, error } = useQuery(
    "category_list",
    fetchCategories, 
    {
      refetchOnWindowFocus: false
    }
  );
  const deleteCategoryMutation = useMutation(deleteCategory, {
    // Optimistically update the cache value an mutate, but store the old value and return it so its accessible on error
    onMutate: async (id) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries("category_list");

      // Snapshot the previous value
      const previous_value = queryClient.getQueryData("category_list");

      // Optimistically update to the new value
      queryClient.setQueryData("category_list", (oldData) => {
        const newArray = findAtIndexAndDelete(oldData, id);
        return newArray;
      });
      // Return a context obj with snapshot value
      return { previous_value };
    },
    // On Failure, roll back to the previous value
    onError: (err, variables, context) => {
      queryClient.setQueryData("category_list", context.previous_value);
    },
    // After success or failure, refresh the todo query
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries("category_list");
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
    return <main className="error">Error: {error.message}</main>;
  }
  if (isFetching) {
    return (
      <main className="padded stock-container">
        <Loading />
        <Link to="/admin" className="back padded">
          {<BackArrow />}
        </Link>
        <h1>Categories</h1>
        <CategoryList data={data} delete={deleteCategoryMutation.mutate} />
      </main>
    );
  }
  // Response should be good, so continue

  return (
    <main className="padded stock-container">
      <Link to="/admin" className="back padded">
        {<BackArrow />}
      </Link>
      <h1>Categories</h1>
      <CategoryList data={data} delete={deleteCategoryMutation.mutate} />
    </main>
  );
}
