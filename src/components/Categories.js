import { useQuery } from "react-query";
import fetchCategories from "../api/fetchCategories";
import CategoryList from "../components/CategoryList";
import Loading from "./popups/loading";

export default function Categories() {
  const { isLoading, isError, data, error } = useQuery(
    "category_list",
    fetchCategories
  );
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
  // Response should be good, so continue
  return (
    <main className="padded stock-container">
      <h1>Categories</h1>
      <CategoryList data={data}/>
    </main>
  );
}