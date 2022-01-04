import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./styles/app.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Item from "./components/Item";
import Cart from "./components/Cart";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router basename="/shopping-cart">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Item />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
