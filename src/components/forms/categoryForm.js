import "../../styles/form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryForm(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  function handleSubmit(event) {
    const newCategory = {
      name: name,
      description: description,
    };
    props.onSubmit(newCategory);
    event.preventDefault();
    setName("");
    setDescription("");
  }
  function handleSubmitBack(e) {
    if (!name || !description) {
      return;
    }
    handleSubmit(e);
    props.submitBack();
  }
  return (
    <form method="POST" action={props.action} onSubmit={handleSubmit}>
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
          <btn className="cancel btn" onClick={() => navigate(-1)}>
            Cancel
          </btn>
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
