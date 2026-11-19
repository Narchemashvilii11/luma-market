import { Fragment } from "react";
import { Link } from "react-router";
import dayjs from "dayjs";

export function OrderDetailsGrid({ order, loadCart }) {
  const addToCart = async (orderProduct) => {
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

    const existingItem = cart.find(
      (item) => item.productId === orderProduct.productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        productId: orderProduct.productId,
        quantity: 1,
        product: orderProduct.product,
      });
    }

    localStorage.setItem("luma-market-cart", JSON.stringify(cart));

    await loadCart();
  };

  return (
    <div className="order-details-grid">
      {order.products.map((orderProduct) => (
        <Fragment key={orderProduct.productId}>
          <div className="product-image-container">
            <img
              src={orderProduct.product.image}
              alt={orderProduct.product.name}
            />
          </div>

          <div className="product-details">
            <div className="product-name">{orderProduct.product.name}</div>

            <div className="product-delivery-date">
              Arriving on:{" "}
              {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D")}
            </div>

            <div className="product-quantity">
              Quantity: {orderProduct.quantity}
            </div>

            <button
              className="buy-again-button button-primary"
              onClick={() => addToCart(orderProduct)}
            >
              <img
                className="buy-again-icon"
                src="/images/icons/buy-again.png"
                alt=""
              />
              <span className="buy-again-message">Add to Cart</span>
            </button>
          </div>

          <div className="product-actions">
            <Link to={`/tracking/${order.id}/${orderProduct.productId}`}>
              <button className="track-package-button button-secondary">
                Track package
              </button>
            </Link>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
