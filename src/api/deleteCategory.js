const deleteCategory = async function (id) {
  return await fetch("https://still-lowlands-16466.herokuapp.com/api/plants/categories/delete", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: id }),
  });
};

export default deleteCategory;
