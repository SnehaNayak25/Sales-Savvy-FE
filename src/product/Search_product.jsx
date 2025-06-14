import React, { useState } from 'react';

export default function Search_Product() {
  const [searchId, setSearchId] = useState('');
  const [product, setProduct] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:8080/searchProduct?id=${searchId}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    } catch  {
      alert("Product not found");
      setProduct(null);
    }
  };

  return (
    <div>
      <h2>Search Product by ID</h2>
      <input 
        type="text" 
        placeholder="Enter product ID" 
        value={searchId} 
        onChange={(e) => setSearchId(e.target.value)} 
      />
      <button onClick={handleSearch}>🔍</button>

      {product && (
        <div style={{ marginTop: '20px' }}>
          <h3>Product Found:</h3>
          <p><strong>Name:</strong> {product.name}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> {product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Reviews:</strong> {product.reviews.join(', ')}</p>
          <img src={product.photo} alt={product.name} width="100" />
        </div>
      )}
    </div>
  );
}
