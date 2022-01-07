import fetchCategory from "../../api/fetchCategoryById";
import { useQuery } from "react-query";
import CategoryForm from "./categoryForm";
import "../../styles/newPlant.css";
import { useState } from "react";
import CheckmarkPopup from "../popups/checkmarkPopup";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../popups/loading";

const EditCategory = () => {
  const location = useLocation();
  const { id } = location.state;
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, isError, data, error } = useQuery(
    "category_item",
    () => fetchCategory(id),
    {
      cacheTime: 0,
    }
  );
  const navigate = useNavigate();

  // Submit new plant to API
  function submitEditCategory(data, redirect) {
    fetch("http://localhost:3000/api/plants/categories/edit", {
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
  // Submit new plant and redirect to Back
  function sumbitEditCategoryAndBack(data) {
    submitEditCategory(data, true);
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
    return <div className="error">Error: {error.message}</div>;
  }
  // Response is good so Continue
  return (
    <main className="padded new-plant">
      <h1>Edit Category</h1>
      <CategoryForm
        category={data}
        onSubmit={submitEditCategory}
        submitBack={sumbitEditCategoryAndBack}
      />
      {showConfirm ? <CheckmarkPopup /> : null}
    </main>
  );
};

export default EditCategory;
