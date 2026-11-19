import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function Product({ product, loadCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const addToCart = async () => {
    let cart = [];

    try {
      const savedCart = JSON.parse(
        localStorage.getItem("luma-market-cart") || "[]",
      );

      if (Array.isArray(savedCart)) {
        cart = savedCart;
      }
    } catch {
      cart = [];
    }

    const existingItem = cart.find((item) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        quantity,
        product,
      });
    }

    localStorage.setItem("luma-market-cart", JSON.stringify(cart));

    await loadCart();

    setShowAddedMessage(true);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 2000);
  };

  const selectQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          alt={`${product.rating.stars} stars`}
        />

        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={selectQuantity}
          data-testid="quantity-selector"
        >
          {Array.from({ length: 10 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className="added-to-cart"
        style={{ opacity: showAddedMessage ? 1 : 0 }}
      >
        <img src="/images/icons/checkmark.png" alt="" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        data-testid="add-to-cart-button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
