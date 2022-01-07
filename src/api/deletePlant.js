const deletePlant = async function (id) {
    return await fetch("https://still-lowlands-16466.herokuapp.com/api/plants/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
  };
  
  export default deletePlant;
  