async function fetchPlantList() {
  let results = await fetch("https://still-lowlands-16466.herokuapp.com/api/plants/all");
  let json = await results.json();
  return json;
}

export default fetchPlantList;
