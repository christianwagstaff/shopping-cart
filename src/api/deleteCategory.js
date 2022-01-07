const deleteCategory = async function (id) {
  return await fetch("http://localhost:3000/api/plants/categories/delete", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id }),
  });
};

export default deleteCategory;
