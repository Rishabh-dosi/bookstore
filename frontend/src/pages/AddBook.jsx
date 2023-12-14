import React, { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { RingLoader } from "react-spinners";
function AddBook() {
    const [values, setValues] = useState({
        title: "",
        author: "",
        price: 0,
        publishYear: 0,
    });
    const [loading, isloading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }
    const handleValidation = (e) => {
        const { title, author, price, publishYear } = values;
        if (title.length === 0) {
            alert("title not accepted")
            return false;
        }
        else if (author.length === 0) {
            alert("author not accepted")

            return false;
        }
        else if (price === 0) {
            alert("price not accepted")
            return false;
        }
        else if (publishYear === 0) {
            alert("title not accepted")
            return false
        }
        else return true;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            isloading(true);
            const { title, author, price, publishYear } = values;
            try {
                await axios.post('http://localhost:5000/books/registerBooks', {
                    title,
                    author,
                    price,
                    publishYear,
                });

                
                
            } catch (error) {
                console.log(error)
            } finally {
                isloading(false);
                setValues({
                    title: "",
                    author: "",
                    price: 0,
                    publishYear: 0,
                });
                alert("book added");

            }



        }

    }

    return (
        <>
            {
                loading ? <div className="min-w-full min-h-full flex items-center justify-center align-middle"><RingLoader color="#5248c2" size={400} /></div> :
                    <div>
                        <div className="flex justify-around">
                            <button>
                                <Link to={'/'}>Back</Link>
                            </button>
                            <div className="text-[3rem]">
                                Add Book to Bookstore
                            </div>

                        </div>
                        <div className="min-h-[90vh] flex items-center justify-center bg-gray-100">
                        
                        <div className="bg-gray-200 p-4 md:p-8 rounded-md shadow-md w-full md:w-96">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Enter title"
                                    value={values.title}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <input
                                    type="text"
                                    name="author"
                                    placeholder="Enter author"
                                    value={values.author}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <input
                                    type="text"
                                    name="price"
                                    placeholder="Enter price"
                                    value={values.price}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <input
                                    type="text"
                                    name="publishYear"
                                    placeholder="Enter publish year"
                                    value={values.publishYear}
                                    onChange={handleChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                                >
                                    ADD
                                </button>
                            </form>
                        </div>
                    </div>
                    </div>

            }
        </>
    )
}
export default AddBook;