import fetchCategory from "../../api/fetchCategories";
import { useQuery } from "react-query";
import CategoryForm from "./categoryForm";
import "../../styles/newPlant.css";
import { useState } from "react";
import CheckmarkPopup from "../popups/checkmarkPopup";
import { useNavigate } from "react-router-dom";

const NewCategoryForm = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoading, isError, data, error } = useQuery(
    "category_list",
    fetchCategory
  );
  // Submit new plant to API
  const navigate = useNavigate();
  function submitNewCategory(data, redirect) {
    fetch("http://localhost:3000/api/plants/categories/new", {
      method: "POST",
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
  function submitNewCategoryAndBack(data) {
    submitNewCategory(data, true);
  }
  // Check to see if Data is loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // Response is good so Continue
  return (
    <main className="padded new-plant">
      <h1>Create a New Category</h1>
      <CategoryForm
        categories={data}
        onSubmit={submitNewCategory}
        submitBack={submitNewCategoryAndBack}
      />
      {showConfirm ? <CheckmarkPopup /> : null}
    </main>
  );
};

export default NewCategoryForm;
