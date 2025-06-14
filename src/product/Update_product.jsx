import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../css/style.css';

export default function Update_product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    reviews: '',
    photo: ''
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:8080/searchProduct?id=${id}`);
      const data = await res.json();
      setProduct({
        ...data,
        reviews: data.reviews.join(', ')
      });
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      reviews: product.reviews.split(',').map(r => r.trim())
    };

    const res = await fetch("http://localhost:8080/updateProduct", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct)
    });

    const result = await res.text();
    alert(result);
    navigate('/getAllProducts');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2>Update Product</h2>
        <div className="nav-links">
          <NavLink to="/getAllProducts" className="nav-link">Back to Products</NavLink>
        </div>
      </nav>
      
      <div className="form-container">
        <h3 className="form-title">Update Product Details</h3>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={product.name} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <input type="text" name="description" value={product.description} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input type="text" name="category" value={product.category} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Reviews (comma separated)</label>
            <input type="text" name="reviews" value={product.reviews} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label>Photo URL</label>
            <input type="text" name="photo" value={product.photo} onChange={handleChange} />
          </div>
          
          <button type="submit" className="submit-btn">Update Product</button>
        </form>
      </div>
    </div>
  );
}