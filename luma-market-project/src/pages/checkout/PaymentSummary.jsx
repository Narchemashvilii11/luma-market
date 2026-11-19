import { useNavigate } from "react-router";
import { formatMoney } from "../../utils/money";

const deliveryOptions = [
  { id: "1", deliveryDays: 7, priceCents: 0 },
  { id: "2", deliveryDays: 3, priceCents: 499 },
  { id: "3", deliveryDays: 1, priceCents: 999 },
];

export function PaymentSummary({ loadCart }) {
  const navigate = useNavigate();

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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const productCostCents = cart.reduce(
    (total, item) => total + item.product.priceCents * item.quantity,
    0,
  );

  const shippingCostCents = cart.reduce((total, item) => {
    const selectedOption =
      deliveryOptions.find((option) => option.id === item.deliveryOptionId) ||
      deliveryOptions[0];

    return total + selectedOption.priceCents;
  }, 0);

  const totalCostBeforeTaxCents = productCostCents + shippingCostCents;

  const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);

  const totalCostCents = totalCostBeforeTaxCents + taxCents;

  const createOrder = async () => {
    if (cart.length === 0) {
      return;
    }

    const savedOrders = JSON.parse(
      localStorage.getItem("luma-market-orders") || "[]",
    );

    const newOrder = {
      id: crypto.randomUUID(),
      orderTimeMs: Date.now(),
      totalCostCents,
      products: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTimeMs:
          Date.now() +
          (
            deliveryOptions.find(
              (option) => option.id === item.deliveryOptionId,
            ) || deliveryOptions[0]
          ).deliveryDays *
            24 *
            60 *
            60 *
            1000,
        product: item.product,
      })),
    };

    localStorage.setItem(
      "luma-market-orders",
      JSON.stringify([newOrder, ...savedOrders]),
    );

    localStorage.setItem("luma-market-cart", "[]");

    await loadCart();

    navigate("/orders");
  };

  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-product-cost"
      >
        <div>Items ({totalItems}):</div>
        <div className="payment-summary-money">
          {formatMoney(productCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row"
        data-testid="payment-summary-shipping-cost"
      >
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">
          {formatMoney(shippingCostCents)}
        </div>
      </div>

      <div
        className="payment-summary-row subtotal-row"
        data-testid="payment-summary-total-before-tax"
      >
        <div>Total before tax:</div>
        <div className="payment-summary-money">
          {formatMoney(totalCostBeforeTaxCents)}
        </div>
      </div>

      <div className="payment-summary-row" data-testid="payment-summary-tax">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatMoney(taxCents)}</div>
      </div>

      <div
        className="payment-summary-row total-row"
        data-testid="payment-summary-total"
      >
        <div>Order total:</div>
        <div className="payment-summary-money">
          {formatMoney(totalCostCents)}
        </div>
      </div>

      <button
        className="place-order-button button-primary"
        onClick={createOrder}
        disabled={cart.length === 0}
        data-testid="place-order-button"
      >
        Place your order
      </button>
    </div>
  );
}
