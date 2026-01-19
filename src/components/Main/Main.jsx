import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Contact from "../Contact/Contact";
import Books from "../Books/Books";

function Main() {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </main>
  );
}

export default Main;
