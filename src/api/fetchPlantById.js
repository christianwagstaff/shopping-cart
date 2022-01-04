async function fetchPlant(id) {
  let results = await fetch(`http://localhost:3000/api/plants/${id}`);
  let json = await results.json();
  return json;
}

export default fetchPlant;
