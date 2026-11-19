import { CheckoutHeader } from "./CheckoutHeader";
import { useState } from "react";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./checkout-header.css";
import "./CheckoutPage.css";

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions] = useState([
    {
      id: "1",
      deliveryDays: 7,
      priceCents: 0,
    },
    {
      id: "2",
      deliveryDays: 3,
      priceCents: 499,
    },
    {
      id: "3",
      deliveryDays: 1,
      priceCents: 999,
    },
  ]);

  const paymentSummary = null;

  return (
    <>
      <title>Luma Market | Checkout</title>
      <link rel="icon" type="image/png" href="/images/cart-favicon.png" />

      <CheckoutHeader cart={cart} />

      <main className="checkout-page">
        <div className="checkout-page-heading">
          <span className="checkout-page-label">ALMOST THERE</span>

          <h1 className="page-title">Review your order</h1>

          <p className="checkout-page-description">
            Check your items, choose your delivery options, and review your
            total before placing your order.
          </p>
        </div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            loadCart={loadCart}
          />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </main>
    </>
  );
}
