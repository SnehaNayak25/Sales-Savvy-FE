import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';  // Add this import
import '../css/style.css'

export default function Add_product() {
    const [name,setProductname] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [reviews,setReviews] = useState("");
    const [photo,setPhoto] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const productData = {
            name,
            description,
            price,
            category,
            reviews: reviews.split(",").map(r => r.trim()),
            photo
        };

        const response = await fetch("http://localhost:8080/addProduct",{
            method:"POST",
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        const result = await response.text();
        alert(result);
    }

    return (
        <div className="container">
            <nav className="navbar">
                <h2>Add Product</h2>
                <div className="nav-links">
                    <NavLink to="/productManage" className="nav-link">Back to Products</NavLink>
                </div>
            </nav>
            <div className="form-container">
                <h3 className="form-title">Add New Product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Product Name</label>
                        <input type="text" name="productname" value={name} 
                            onChange={(e)=> setProductname(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" name="description" value={description} 
                            onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" value={price} 
                            onChange={(e)=> setPrice(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" name="category" value={category} 
                            onChange={(e)=> setCategory(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label>Reviews (comma separated)</label>
                        <input type="text" name="reviews" value={reviews} 
                            onChange={(e)=> setReviews(e.target.value)} />
                    </div>
                    
                    <div className="form-group">
                        <label>Photo URL</label>
                        <input type="text" name="photo" value={photo} 
                            onChange={(e)=> setPhoto(e.target.value)} />
                    </div>
                    
                    <button type="submit" className="submit-btn">Add Product</button>
                </form>
            </div>
        </div>
    )
}