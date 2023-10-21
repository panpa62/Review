import "./App.css";
import { Routes, Route } from "react-router-dom";
import Posts from "./features/Posts.jsx";
import Login from "./features/Auth/Login.jsx";
import Navbar from "./layout/Navbar.jsx";

function App() {
  return (
    <>
      <h1>Hello</h1>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
