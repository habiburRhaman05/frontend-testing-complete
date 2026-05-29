"use client"
import React from 'react';

interface ProductBadgeProps {
  stock: number;
  discount?: number;
  tags: string[];
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({ stock, discount, tags }) => {
  return (
    <div className="p-3 border rounded-md shadow-sm">
      {/* 1. Stock Status Conditional Rendering */}
      {stock === 0 ? (
        <span className="text-red-600 font-semibold" aria-label='out-of-stock'>Out of Stock</span>
      ) : stock <= 5 ? (
        <span className="text-amber-500 font-medium">Low Stock: {stock} left</span>
      ) : (
        <span className="text-green-600">In Stock</span>
      )}

      {/* 2. Optional Discount Badge */}
      {discount && discount > 0 && (
        <div aria-label='discount' className="mt-2 text-sm text-purple-700 font-bold bg-purple-100 px-2 py-0.5 rounded inline-block">
          {discount}% OFF
        </div>
      )}

      {/* 3. Render list of tags */}
      {tags.length > 0 && (
        <div className="mt-3 flex gap-1 flex-wrap" aria-label='tags-list'>
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-200 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};