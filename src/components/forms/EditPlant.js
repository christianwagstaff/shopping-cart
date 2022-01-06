import fetchCategory from "../../api/fetchCategories";
import { useQueries } from "react-query";
import PlantForm from "./plantForm";
import "../../styles/newPlant.css";
import { useState } from "react";
import CheckmarkPopup from "../popups/checkmarkPopup";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../popups/loading";
import fetchPlant from "../../api/fetchPlantById";

const EditPlant = () => {
  const location = useLocation();
  const { id } = location.state;
  const [showConfirm, setShowConfirm] = useState(false);
  const results = useQueries([
    {
      queryKey: "category_list",
      queryFn: fetchCategory,
    },
    {
      queryKey: "plant_item",
      queryFn: () => fetchPlant(id),
      cacheTime: 0,
    },
  ]);
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  // Submit new plant to API
  const navigate = useNavigate();
  function submitEditPlant(data, redirect) {
    console.log(data);
    fetch("http://localhost:3000/api/plants/edit", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(
      // Show confirmation checkmark UI
      setShowConfirm(true),
      setTimeout(() => {
        setShowConfirm(false);
        // Redirect user back if redirect is passed
        if (redirect) {
          navigate(-1);
        }
      }, 1000)
    );
  }
  // Submit new plant and redirect to Admin Page
  function submitNewPlantAndBack(data) {
    submitEditPlant(data, true);
  }
  // Check to see if Data is loaded
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (isError) {
    return <div className="error">Error:</div>;
  }
  // Response is good so Continue
  return (
    <main className="padded new-plant">
      <h1>Edit Plant</h1>
      <PlantForm
        categories={results[0].data}
        plant={results[1].data}
        onSubmit={submitEditPlant}
        submitBack={submitNewPlantAndBack}
      />
      {showConfirm ? <CheckmarkPopup /> : null}
    </main>
  );
};

export default EditPlant;
