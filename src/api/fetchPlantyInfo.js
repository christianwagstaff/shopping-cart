async function fetchPlantyInfo() {
    let results = await fetch("https://still-lowlands-16466.herokuapp.com/api/store/info");
    let json = await results.json();
    return json;
  }
  
  export default fetchPlantyInfo;
  