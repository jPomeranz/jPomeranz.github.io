import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "../Home/Home";

// Lazy load routes that aren't immediately needed
const Contact = lazy(() => import("../Contact/Contact"));
const Books = lazy(() => import("../Books/Books"));

function Main() {
  return (
    <main>
      <Suspense fallback={<div style={{ padding: "2em" }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </Suspense>
    </main>
  );
}

export default Main;
