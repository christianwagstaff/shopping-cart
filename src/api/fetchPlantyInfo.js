async function fetchPlantyInfo() {
    let results = await fetch("http://localhost:3000/api/store/info");
    let json = await results.json();
    return json;
  }
  
  export default fetchPlantyInfo;
  