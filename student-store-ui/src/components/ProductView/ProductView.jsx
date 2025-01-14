/* eslint-disable react/prop-types */
import * as React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './ProductView.css';

export default function ProductView({
  product, productId, shoppingCart, handleAddItemToCart, handleRemoveItemFromCart,
}) {
  return (
    <div className="product-view">
      <br />
      <br />
      <h1 className="product-id">
        Product #
        {productId}
      </h1>
      <ProductCard
        key={productId}
        product={product}
        productId={productId}
        shoppingCart={shoppingCart}
        showDescription
        handleAddItemToCart={handleAddItemToCart}
        handleRemoveItemFromCart={handleRemoveItemFromCart}
      />
    </div>
  );
}
