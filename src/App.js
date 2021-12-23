import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/app.css";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import Shop from "./components/Shop";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
