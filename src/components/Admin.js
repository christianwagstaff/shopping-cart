import "../styles/admin.css";
import { useQuery } from "react-query";
import fetchPlantyInfo from "../api/fetchPlantyInfo";
import { Link } from "react-router-dom";

const Admin = () => {
  const { isLoading, isError, data, error } = useQuery(
    "store_info",
    fetchPlantyInfo
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div className="error">Error: {error.message}</div>;
  }
  // Response is good so Continue
  return (
    <main className="admin padded">
      <h1>Planty Admin</h1>
      <p>
        Here you can control what plants are available to sell, their quantities
      </p>
      <StoreInfo data={data} />
      <Link to="/admin/stock" className="btn">
        View Current Stock
      </Link>
      <Link to="/admin/newplant" className="btn">
        Create New Plant
      </Link>
      <Link to="/admin/newcategory" className="btn">
        Create New Category
      </Link>
      <Link to="/admin/plants" className="btn">
        View Plants
      </Link>
      <Link to="/admin/categories" className="btn">
        View Categories
      </Link>
    </main>
  );
};

export default Admin;

const StoreInfo = (params) => {
  let data = params.data;
  return (
    <div className="info">
      <div className="horizontal left">
        <p>Plant Count: </p>
        <div>{data.plant_count}</div>
      </div>
      <div className="horizontal left">
        <p>Category Count: </p>
        <div>{data.category_count}</div>
      </div>
    </div>
  );
};
