import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import '../css/style.css';

export default function View_Products() {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/getAllProducts");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleSearch = async () => {
    if (!searchId.trim()) {
      alert("Please enter a product ID");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/searchProduct?id=${searchId}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProducts([data]);
    } catch  {
      alert("Product not found");
      setProducts([]);
    }
  };

  const clearSearch = () => {
    setSearchId('');
    fetchProducts();
  };

  const confirmDelete = (id) => {
    setProductToDelete(id);
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(`http://localhost:8080/deleteProduct?id=${productToDelete}`, {
        method: "GET"
      });
      const result = await res.text();
      alert(result);
      setShowConfirm(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2>View Products</h2>
        <div className="nav-links">
          <NavLink to="/productManage" className="nav-link">Back to Products</NavLink>
        </div>
      </nav>
      
      <div className="table-container">
        <div className="search-container">
          <input 
            type="text" 
            className="search-input"
            placeholder="Enter Product ID" 
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
          />
          <button className="search-btn" onClick={handleSearch}>Search</button>
          <button className="clear-btn" onClick={clearSearch}>Clear</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Reviews</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.id}</td>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>${prod.price}</td>
                  <td>{prod.category}</td>
                  <td>{prod.reviews?.join(', ')}</td>
                  <td>
                    <img src={prod.photo} alt={prod.name} width="60" />
                  </td>
                  <td>
                    <button 
                      className="action-btn"
                      onClick={() => navigate(`/updateProduct/${prod.id}`)}
                    >✏️</button>
                    <button 
                      className="action-btn"
                      onClick={() => confirmDelete(prod.id)}
                    >🗑️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No products found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button className="modal-btn confirm" onClick={handleDeleteConfirmed}>Yes</button>
              <button className="modal-btn cancel" onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}