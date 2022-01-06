import "../../styles/form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlantForm(props) {
  const navigate = useNavigate();
  const categories = props.categories || [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [checkedState, setCheckedState] = useState(
    new Array(categories.length).fill(false)
  );
  function handleCheckedChange(position) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  }
  function clearData() {
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
    setCheckedState(new Array(categories.length).fill(false));
  }
  function createNewPlant() {
    const newPlant = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: categories
        .filter((e, index) => checkedState[index])
        .map((e) => e._id),
    };
    return newPlant;
  }
  function handleSubmit(event) {
    const newPlant = createNewPlant();
    props.onSubmit(newPlant);
    event.preventDefault();
  }
  function handleSubmitBack(e) {
    if (!name || !description || !price || !stock) {
      return;
    }
    const newPlant = createNewPlant();
    e.preventDefault();
    props.submitBack(newPlant);
    clearData();
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
            placeholder="Plant Name"
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
            placeholder="Plant Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-input">
          <legend>Category: </legend>
          <div id="category-list">
            {categories.map((cat, index) => {
              return (
                <div className="category" key={cat._id}>
                  <input
                    type="checkbox"
                    name="category"
                    value={cat._id}
                    checked={checkedState[index]}
                    id={cat._id}
                    onChange={() => handleCheckedChange(index)}
                  />
                  <label htmlFor={cat._id}>
                    {upperCaseFirstOnly(cat.name)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-input">
          <label htmlFor="price">Price: </label>
          <input
            name="price"
            type="number"
            required={true}
            placeholder="Price"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="stock">Stock: </label>
          <input
            name="stock"
            type="number"
            required={true}
            placeholder="Stock Available"
            min="0"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="btn-list">
          <button className="cancel btn" onClick={() => navigate(-1)}>
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

function upperCaseFirstOnly(string) {
  return `${string.substring(0, 1).toUpperCase()}${string
    .substring(1)
    .toLowerCase()}`;
}
