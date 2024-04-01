import { Routes, Route } from "react-router-dom";
import Pagenotfound from "./pages/Pagenotfound.js";
import Policy from "./pages/Policy.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import HomePage from "./pages/HomePage.js";
import Register from "./pages/Auth/Register.js";
import Login from "./pages/Auth/Login.js";
import Dashboard from "./pages/user/Database.js";
import PrivateRoute from "./components/Routes/Private.js";
import ForgotPasssword from "./pages/Auth/ForgotPassword.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
