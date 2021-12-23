import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";
import Item from "./components/Item";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Item />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
