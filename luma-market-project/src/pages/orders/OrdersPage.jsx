import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { OrdersGrid } from "./OrdersGrid";
import "./OrdersPage.css";

export function OrdersPage({ cart, loadCart }) {
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = JSON.parse(
        localStorage.getItem("luma-market-orders") || "[]",
      );

      return Array.isArray(savedOrders) ? savedOrders : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedOrders = JSON.parse(
          localStorage.getItem("luma-market-orders") || "[]",
        );

        setOrders(Array.isArray(savedOrders) ? savedOrders : []);
      } catch {
        setOrders([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
