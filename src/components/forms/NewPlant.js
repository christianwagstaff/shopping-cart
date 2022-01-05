import fetchCategory from "../../api/fetchCategories";
import { useQuery } from "react-query";
import "../../styles/form.css";

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
  console.log(data);
  return (
    <main className="padded new-plant">
      <h1>Create a New Plant</h1>
      <form method="POST" action="">
        <fieldset>
          <div className="form-input">
            <label for="name">Name: </label>
            <input
              name="name"
              type="text"
              required={true}
              placeholder="Plant Name"
            />
          </div>
          <div className="form-input">
            <label for="description">Description: </label>
            <textarea
              type="text"
              name="description"
              required={true}
              placeholder="Plant Description"
            />
          </div>
          <div className="form-input">
            <legend>Category: </legend>
            <div id="category-list">
              {data.map((cat) => {
                return (
                  <div className="category">
                    <input
                      type="checkbox"
                      name="category"
                      value={cat._id}
                      id={cat._id}
                    />
                    <label for={cat._id}>{upperCaseFirstOnly(cat.name)}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-input">
            <label for="price">Price: </label>
            <input
              name="price"
              type="number"
              required={true}
              placeholder="Price"
              min={1}
            />
          </div>
          <div className="form-input">
            <label for="stock">Stock: </label>
            <input
              name="stock"
              type="number"
              required={true}
              placeholder="Stock Available"
            />
          </div>
          <input type="submit" className="btn" />
        </fieldset>
      </form>
    </main>
  );
};

export default NewPlantForm;

function upperCaseFirstOnly(string) {
  return `${string.substring(0, 1).toUpperCase()}${string
    .substring(1)
    .toLowerCase()}`;
}
