/* eslint-disable react/prop-types */
import * as React from 'react';
import formatPrice from '../currency';
import './ShoppingCart.css';

// **********************************************************************
// CONSTANTS
// **********************************************************************

const taxRate = 0.0875;

// **********************************************************************
// HELPER FUNCTION(S)
// **********************************************************************

// gets info of specific product given id and products list
function getProductFromProducts(productId, products) {
  return products.find((product) => product.id === productId);
}

// calculates total price (and other info) of shopping cart
function calculateTotal(shoppingCart, products) {
  let sum = 0;
  let totalItems = 0;
  shoppingCart.forEach((item) => {
    const itemPrice = getProductFromProducts(item.itemId, products).price;
    const itemQuantity = item.quantity;
    sum += itemPrice * itemQuantity;
    totalItems += 1;
  });
  const tax = sum * taxRate;
  return {
    itemCount: totalItems,
    subtotal: formatPrice(sum),
    tax: formatPrice(tax),
    total: formatPrice(sum + tax),
  };
}

// **********************************************************************
// ELEMENT RENDERING
// **********************************************************************

export default function ShoppingCart({
  isOpen, products, shoppingCart, purchaseCompleted,
  handleAddItemToCart, handleRemoveItemFromCart,
}) {
  // only render material if sidebar is open
  if (isOpen) {
    // if a purchase was just completed, don't display the shopping cart
    if (purchaseCompleted) {
      return null;
    }
    // if no items are in the shopping cart
    if (shoppingCart.length === 0) {
      return (
        <p className="notification">No items added to cart yet. Start shopping now!</p>
      );
    }
    const priceInfo = calculateTotal(shoppingCart, products);
    // otherwise, render the items in the shopping cart with price info
    return (
      <div className="shopping-cart">
        <table className="cart-breakdown">
          <thead>
            <tr>
              <th className="cart-product-name header header-cell">Name</th>
              <th className="cart-product-quantity header header-cell">Quantity</th>
              <th className="cart-product-unit-price header header-cell">Unit Price</th>
              <th className="cart-product-price header header-cell">Cost</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item) => {
              const product = getProductFromProducts(item.itemId, products);
              return (
                <tr key={item.itemId} className="item-row">
                  <td className="cart-product-name item-cell">
                    {product.name}
                  </td>
                  <td className="cart-product-quantity item-cell">
                    <button
                      onClick={() => handleRemoveItemFromCart(item.itemId)}
                      className="cart-remove"
                      type="button"
                    >
                      -
                    </button>
                    {` ${item.quantity} `}
                    <button
                      onClick={() => handleAddItemToCart(item.itemId)}
                      className="cart-add"
                      type="button"
                    >
                      +
                    </button>

                  </td>
                  <td className="cart-product-unit-price item-cell">{formatPrice(product.price)}</td>
                  <td className="cart-product-price item-cell">{formatPrice(product.price * item.quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="subtotal receipt">
          Subtotal:
          {' '}
          {priceInfo.subtotal}
        </p>
        <p className="tax receipt">
          Taxes and fees:
          {' '}
          {priceInfo.tax}
        </p>
        <p className="total receipt">
          Total:
          {' '}
          {priceInfo.total}
        </p>
      </div>
    );
  }
}
