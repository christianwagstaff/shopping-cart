async function fetchPlant(id) {
    let results = await fetch(`https://still-lowlands-16466.herokuapp.com/api/plants/categories/${id}`);
    let json = await results.json();
    return json;
  }
  
  export default fetchPlant;
  