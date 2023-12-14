import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cart from "./Cart";

function Home() {
    const [books, setBooks] = useState([]);
    const [cart, addtoCart] = useState([]);
    const [showcart, setshowcart] = useState(false);
    const navigate = useNavigate();
    const AddCart = (e) => {
        if (!cart.includes(e)) {
            addtoCart((prev) => [...prev, e]);
            
        }
        
    }
    useEffect(() => {
        axios.get('http://localhost:5000/books/bookstore').then((response) => {
            setBooks(response.data.data);
        }).catch((er) => {
            console.log(er);
        })
    }, [])
    return (
        <>
            <div className="flex w-full h-16 items-center bg-blue-500 justify-between px-4">
                <div className="font-serif text-2xl text-white">Book Store</div>
                <div className="rounded-full w-12 h-12 bg-slate-500 text-2xl flex items-center justify-center">
                    <Link to="/addbook" className="text-white ">+</Link>
                </div>
                <div className="relative right-0 p-3 m-5">
                    <button onClick={() => { setshowcart(!showcart) }}> cart</button>
                </div>
            </div>

            {showcart ? <Cart cart={cart} /> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {books.map((book) => (
                    <div key={book._id} className="flex flex-col bg-white p-4 rounded-md shadow-md">
                        <div className="bg-purple-200 p-2 rounded-md">
                            {book.title}
                        </div>
                        <div className="mt-2">
                            Price: Rs{book.price}/-
                        </div>
                        <div className="mt-2">
                            Author:{book.author}
                        </div>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Buy</button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-3" onClick={() => { AddCart(book._id) }}>Cart</button>
            
                    </div>
                ))}
                
                
            </div>}

        </>
    )
}
export default Home;