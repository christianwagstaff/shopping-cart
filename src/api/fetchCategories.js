async function fetchCategories(id) {
  let results = await fetch(`http://localhost:3000/api/plants/categories`);
  let json = await results.json();
  return json;
}

export default fetchCategories;
