async function fetchCategories() {
  let results = await fetch(`https://still-lowlands-16466.herokuapp.com/api/plants/categories`);
  let json = await results.json();
  return json;
}

export default fetchCategories;
