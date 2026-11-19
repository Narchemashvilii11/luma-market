import { Routes, Route } from "react-router";
import { useState } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/orders/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./App.css";

function App() {
  const getSavedCart = (): any[] => {
    try {
      const savedCart = localStorage.getItem("luma-market-cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch {
      return [];
    }
  };

  const [cart, setCart] = useState<any[]>(getSavedCart);

  const loadCart = async () => {
    setCart(getSavedCart());
  };

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route
        path="checkout"
        element={<CheckoutPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="orders"
        element={<OrdersPage cart={cart} loadCart={loadCart} />}
      />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage cart={cart} />}
      />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  );
}

export default App;
