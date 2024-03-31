import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound.js";
import Policy from "./pages/Policy.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import HomePage from "./pages/HomePage.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
