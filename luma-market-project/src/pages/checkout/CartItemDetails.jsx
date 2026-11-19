import { useState, useEffect } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  useEffect(() => {
    if (!isUpdatingQuantity) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem.quantity, isUpdatingQuantity]);

  const deleteCartItem = async () => {
    const cart = JSON.parse(localStorage.getItem("luma-market-cart") || "[]");

    const updatedCart = cart.filter(
      (item) => item.productId !== cartItem.productId,
    );

    localStorage.setItem("luma-market-cart", JSON.stringify(updatedCart));

    await loadCart();
  };

  const updateQuantity = async () => {
    if (!isUpdatingQuantity) {
      setIsUpdatingQuantity(true);
      return;
    }

    const newQuantity = Number(quantity);

    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
      return;
    }

    const cart = JSON.parse(localStorage.getItem("luma-market-cart") || "[]");

    const updatedCart = cart.map((item) => {
      if (item.productId === cartItem.productId) {
        return {
          ...item,
          quantity: newQuantity,
        };
      }

      return item;
    });

    localStorage.setItem("luma-market-cart", JSON.stringify(updatedCart));

    await loadCart();
    setIsUpdatingQuantity(false);
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
  };

  const handleQuantityInputKeyDown = (event) => {
    if (event.key === "Enter") {
      updateQuantity();
    } else if (event.key === "Escape") {
      setQuantity(cartItem.quantity);
      setIsUpdatingQuantity(false);
    }
  };

  return (
    <>
      <img
        className="product-image"
        src={cartItem.product.image}
        alt={cartItem.product.name}
      />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>

        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>

        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdatingQuantity ? (
              <input
                type="number"
                min="1"
                step="1"
                className="quantity-input"
                value={quantity}
                onChange={updateQuantityInput}
                onKeyDown={handleQuantityInputKeyDown}
                data-testid="quantity-input"
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>

          <span
            className="update-quantity-link link-primary"
            onClick={updateQuantity}
            data-testid="update-quantity-button"
          >
            {isUpdatingQuantity ? "Save" : "Update"}
          </span>

          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
