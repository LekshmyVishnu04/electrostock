import axios from "axios";
import { useEffect, useState } from "react";

import Navbar from "../Navbar";
import { useSelector } from "react-redux";


function Welcome() {
    var [product, setProduct] = useState([]);
    var [errorMessage, setErrorMessage] = useState("");
    const user = useSelector(store => store.auth.user);

    useEffect(() => {
        if (user && user.token) {
            axios.get(
                "https://worksheet-product.mashupstack.com/product",
                {
                    headers: {
                        Authorization: "Bearer " + user.token
                    }
                }
            )
                .then(response => {
                    setProduct(response.data);
                })
                .catch(error => {
                    console.log("API Error:", error.response?.data);
                    setErrorMessage("Failed to load products.");
                });
        }
    }, [user]);

    return (<div>
        <Navbar></Navbar>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center my-4">Blog</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-8 offset-2">
                    {errorMessage && (
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    )}

                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.map(pro => (
                                    <tr key={pro.id}>
                                        <td>{pro.id}</td>
                                        <td>{pro.name}</td>
                                        <td>{pro.description}</td>
                                        <td>${pro.price}</td>
                                        <td>{pro.quantity}</td>
                                    </tr>
                                ))}

                                {product.length === 0 && !errorMessage && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No products available.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                </div>
            </div>
        </div>
    </div>)
}

export default Welcome;