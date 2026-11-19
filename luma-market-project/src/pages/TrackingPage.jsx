import { useParams, Link } from "react-router";
import { Header } from "../components/Header";
import dayjs from "dayjs";
import "./TrackingPage.css";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();

  let orders = [];

  try {
    const savedOrders = JSON.parse(
      localStorage.getItem("luma-market-orders") || "[]",
    );

    if (Array.isArray(savedOrders)) {
      orders = savedOrders;
    }
  } catch {
    orders = [];
  }

  const order = orders.find((savedOrder) => savedOrder.id === orderId);

  const orderProduct = order?.products?.find(
    (product) => product.productId === productId,
  );

  if (!order || !orderProduct) {
    return (
      <>
        <title>Luma Market | Order Not Found</title>

        <Header cart={cart} />

        <main className="tracking-page">
          <div className="tracking-page-heading">
            <h1 className="page-title">Order not found</h1>

            <p className="tracking-page-description">
              We couldn't find tracking information for this order.
            </p>

            <Link to="/orders" className="back-to-orders-link link-primary">
              View all orders
            </Link>
          </div>
        </main>
      </>
    );
  }

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = Date.now() - order.orderTimeMs;

  const deliveryPercent =
    totalDeliveryTimeMs > 0
      ? Math.max(0, Math.min(100, (timePassedMs / totalDeliveryTimeMs) * 100))
      : 100;

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent >= 100;

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
          <Link className="back-to-orders-link link-primary" to="/orders">
            ← View all orders
          </Link>

          <div className="tracking-product-card">
            <div className="tracking-product-details">
              <div className="delivery-date">
                {isDelivered ? "Delivered on" : "Arriving on"}{" "}
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
                className={`progress-label ${
                  isPreparing ? "current-status" : ""
                }`}
              >
                Preparing
              </div>

              <div
                className={`progress-label ${
                  isShipped ? "current-status" : ""
                }`}
              >
                Shipped
              </div>

              <div
                className={`progress-label ${
                  isDelivered ? "current-status" : ""
                }`}
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
