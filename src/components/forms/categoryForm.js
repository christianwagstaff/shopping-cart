import "../../styles/form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryForm(props) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState(props.category ? props.category.name : "");
  const [description, setDescription] = useState(
    props.category == null ? "" : props.category.description
  );
  function createNewCategory() {
    let newCategory = {
      name: name,
      description: description,
    };
    if (props.category) {
      // Necessary for updating a category, otherwise a new ID will be issued
      newCategory._id = props.category._id;
    }
    return newCategory;
  }
  // function clearData() {
  //   setName("");
  //   setDescription("");
  // }
  function handleSubmit(event) {
    if (!name || !description) {
      return;
    }
    event.preventDefault();
    let newCategory = createNewCategory();
    props.onSubmit(newCategory);
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  }
  function handleSubmitBack(e) {
    if (!name || !description) {
      return;
    }
    let newCategory = createNewCategory();
    e.preventDefault();
    props.submitBack(newCategory);
    setSubmitting(true);
  }
  function handleCancel(e) {
    e.preventDefault();
    if (!submitting) navigate(-1);
  }
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div className="form-input">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            type="text"
            required={true}
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="description">Description: </label>
          <textarea
            type="text"
            name="description"
            required={true}
            placeholder="Category Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="btn-list">
          <button
            className="cancel btn"
            onClick={handleCancel}
            disabled={submitting}
          >
            Cancel
          </button>
          <div className="btn-list-submit">
            <button onClick={handleSubmitBack} className="btn submit">
              Submit and Back
            </button>
            <input type="submit" className="btn submit" />
          </div>
        </div>
      </fieldset>
    </form>
  );
}
