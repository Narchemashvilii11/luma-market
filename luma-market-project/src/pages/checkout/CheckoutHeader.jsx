import { Link } from "react-router";
import "./checkout-header.css";
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";

export function CheckoutHeader({ cart }) {
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  return (
    <div className="checkout-header">
      <div className="header-content">
        <div className="checkout-header-left-section">
          <Link to="/" className="checkout-logo-link">
            <span className="store-logo">
              Luma<span>Market</span>
            </span>
          </Link>
        </div>

        <div className="checkout-header-middle-section">
          Checkout (
          <Link className="return-to-home-link" to="/">
            {totalQuantity} items
          </Link>
          )
        </div>

        <div className="checkout-header-right-section">
          <img src={CheckoutLockIcon} alt="Secure checkout" />
        </div>
      </div>
    </div>
  );
}
