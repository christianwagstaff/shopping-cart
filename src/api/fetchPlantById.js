async function fetchPlant(id) {
  let results = await fetch(`https://still-lowlands-16466.herokuapp.com/api/plants/${id}`);
  let json = await results.json();
  return json;
}

export default fetchPlant;
