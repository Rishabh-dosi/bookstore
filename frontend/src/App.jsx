import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import SearchBook from "./pages/SearchBook";
import AddBook from "./pages/AddBook";
import Cart from "./pages/Cart";
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/searchBook" element={<SearchBook />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App
