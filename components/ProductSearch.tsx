import { searchProducts } from '@/lib/redux/searchSlice';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: any) => state.search);

  useEffect(() => {
    if (!searchTerm.trim()) return;

    const delayDebounceFn = setTimeout(() => {
      dispatch(searchProducts(searchTerm) as any);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch]);

  return (
    <div>
      <h2>Search Products</h2>
      <input
        type="text"
        name='search-input'
        placeholder="Type to search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <p>Searching...</p>}
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}

      <ul>
        {items.map((product: any) => (
          <li key={product.id} data-testid="search-item">
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};