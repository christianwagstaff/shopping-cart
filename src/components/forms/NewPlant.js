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
      <PlantForm categories={data} onSubmit={submitNewPlant} />
    </main>
  );
};

export default NewPlantForm;

function submitNewPlant(data) {
  fetch("http://localhost:3000/api/plants/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
