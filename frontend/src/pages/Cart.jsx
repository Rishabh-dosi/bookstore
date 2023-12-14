import React, { useEffect, useState } from "react";
import axios from "axios";
function Cart({ cart }) {
    const [books, setBooks] = useState([]);
    const [totalprice, setTotalPrice] = useState(0);
    useEffect(() => {
        const fetchBooks = async () => {
            const bookDetails = await Promise.all(
                cart.map(async (id) => {
                    const response = await axios.get(`http://localhost:5000/books/bookstore/${id}`);
                    
                    return response.data;

                })
            );

            setBooks(bookDetails);
            const totalPrice = bookDetails.reduce((total, book) => total + book.price, 0);
            setTotalPrice(totalPrice);
        };

        fetchBooks();
    }, [cart])
    return (
        <>
            
            <div className=" bg-yellow-200 bottom-0 min-w-full min-h-[90vh] flex flex-col items-center p-4">
                <h2 className="text-[3rem]">
                    YOUR CART
                </h2>
                {
                    books.map((book) => {
                        () => add(totalprice + book.price)
                    return (
                        <div className="flex w-[40%] justify-evenly border-solid border-2 border-black border-collapse mt-5 rounded-md hover:bg-gray-200" key={book._id}>
                            <div className="text-[1.2rem] flex-1 p-2">{ book.title }</div>
                            <div className="text-[1.2rem] flex-2 p-2">Rs {book.price} /-</div>
                            
                        </div>
                    )

                })
                    
                }
                <hr  className="w-[40%] border-solid border-black mt-5 mb-5" />
                <div className="flex w-[40%] justify-evenly">
                    <div className="text-[1.2rem] flex-1 p-2">Total bill:</div>
                    <div className="text-[1.2rem] flex-2 p-2">Rs {totalprice}/-</div>
                </div>
                
            
            </div>
        </>
    )
}
export default Cart;