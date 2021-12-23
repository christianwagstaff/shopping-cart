import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./styles/app.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
