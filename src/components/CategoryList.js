import { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryList(props) {
  const [categoryList, setCategoryList] = useState(
    sortList(props.data, "name_formatted", "asc") || []
  );
  const [titleOrder, setTitleOrder] = useState("desc");
  // Handle Delete Cateogry Mutation
  return (
    <div className="stock-list">
      <StockTitle
        name="Name"
        stock="Stock"
        price="Price"
        titleOrder={titleOrder}
        sortTitle={() => {
          setCategoryList(sortList(categoryList, "name_formatted", titleOrder));
          setTitleOrder(titleOrder === "asc" ? "desc" : "asc");
        }}
      />
      {categoryList.map((category) => {
        return (
          <StockItem
            name={category.name_formatted}
            key={category._id}
            id={category._id}
            onDelete={props.delete}
          />
        );
      })}
      <NewCategory />
    </div>
  );
}

const StockItem = (params) => {
  return (
    <div className="stock-list-item single">
      <h4>{params.name}</h4>
      <div className="button-list">
        <button onClick={() => params.onDelete(params.id)}>
          <i className="fas fa-trash edit" />
        </button>
        <Link
          to="/admin/categories/edit"
          className="edit"
          state={{ id: params.id }}
        >
          <i className="far fa-edit edit" />
        </Link>{" "}
      </div>
    </div>
  );
};
const StockTitle = (params) => {
  return (
    <div className="stock-list-item title">
      <div onClick={params.sortTitle} className="horizontal left">
        <h3>{params.name}</h3>
        <i className={faSortIcons(params.titleOrder)}></i>
      </div>
    </div>
  );
};

const NewCategory = () => {
  return (
    <Link to="/admin/newCategory" className="add-new-plant btn">
      + Add a New Cateogry
    </Link>
  );
};

function sortList(list, param, order) {
  let newList;
  try {
    if (order === "asc") {
      newList = [...list].sort((a, b) => (a[param] > b[param] ? 1 : -1));
    } else {
      newList = [...list].sort((a, b) => (a[param] < b[param] ? 1 : -1));
    }
  } catch (err) {
    console.log(err);
    return list;
  }
  return newList;
}

function faSortIcons(order) {
  if (order === "desc") {
    return "fas fa-angle-up";
  } else if (order === "asc") {
    return "fas fa-angle-down";
  }
}
