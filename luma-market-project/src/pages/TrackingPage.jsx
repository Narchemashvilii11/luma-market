import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title>Luma Market | Track Your Order</title>
      <link rel="icon" type="image/png" href="/images/tracking-favicon.png" />

      <Header cart={cart} />

      <main className="tracking-page">
        <div className="tracking-page-heading">
          <span className="tracking-page-label">ORDER TRACKING</span>

          <h1 className="page-title">Track Your Order</h1>

          <p className="tracking-page-description">
            Follow your order's journey and check its delivery progress.
          </p>
        </div>

        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            ← View all orders
          </a>

          <div className="tracking-product-card">
            <div className="tracking-product-details">
              <div className="delivery-date">
                {deliveryPercent >= 100 ? "Delivered on" : "Arriving on"}{" "}
                {dayjs(orderProduct.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="product-info">{orderProduct.product.name}</div>

              <div className="product-info">
                Quantity: {orderProduct.quantity}
              </div>
            </div>

            <div className="tracking-product-image-container">
              <img
                className="product-image"
                src={orderProduct.product.image}
                alt={orderProduct.product.name}
              />
            </div>
          </div>

          <div className="tracking-progress-card">
            <h2 className="tracking-progress-title">Delivery Progress</h2>

            <div className="progress-labels-container">
              <div
                className={`progress-label ${isPreparing && "current-status"}`}
              >
                Preparing
              </div>

              <div
                className={`progress-label ${isShipped && "current-status"}`}
              >
                Shipped
              </div>

              <div
                className={`progress-label ${isDelivered && "current-status"}`}
              >
                Delivered
              </div>
            </div>

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{ width: `${deliveryPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
