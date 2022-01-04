async function fetchPlantList() {
  let results = await fetch("http://localhost:3000/api/plants/all");
  let json = await results.json();
  return json;
}

export default fetchPlantList;
