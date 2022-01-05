import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./styles/app.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import NewPlantForm from "./components/forms/NewPlant";
import NewCategoryForm from "./components/forms/NewCategory";
import Stock from "./components/Stock";
import Plants from "./components/Plants";
import Categories from "./components/Categories";
import EditCategory from "./components/forms/EditCategory";

function App() {
  return (
    <div className="App">
      <Router basename="/shopping-cart">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Item />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/newplant" element={<NewPlantForm />} />
          <Route path="/admin/newcategory" element={<NewCategoryForm />} />
          <Route path="/admin/stock" element={<Stock />} />
          <Route path="/admin/plants" element={<Plants />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/categories/edit" element={<EditCategory />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
