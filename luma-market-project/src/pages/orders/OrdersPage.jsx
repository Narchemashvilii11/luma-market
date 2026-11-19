import axios from "axios";
import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get("/api/orders?expand=products");
      setOrders(response.data);
    };

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Luma Market | Your Orders</title>
      <link rel="icon" type="image/png" href="/images/orders-favicon.png" />

      <Header cart={cart} />

      <main className="orders-page">
        <div className="orders-page-heading">
          <span className="orders-page-label">YOUR PURCHASES</span>

          <h1 className="page-title">Your Orders</h1>

          <p className="orders-page-description">
            Keep track of your purchases, check delivery details, and revisit
            your favorite products.
          </p>
        </div>

        <OrdersGrid orders={orders} loadCart={loadCart} />
      </main>
    </>
  );
}
