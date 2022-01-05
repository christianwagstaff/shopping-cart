import fetchCategory from "../../api/fetchCategories";
import { useQuery } from "react-query";
import PlantForm from "./plantForm";
import "../../styles/newPlant.css";

const NewPlantForm = () => {
  const { isLoading, isError, data, error } = useQuery(
    "category_list",
    fetchCategory
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // Response is good so Continue
  return (
    <main className="padded new-plant">
      <h1>Create a New Plant</h1>
      <PlantForm categories={data} action='http://localhost:3000/plants/new' />
    </main>
  );
};

export default NewPlantForm;
