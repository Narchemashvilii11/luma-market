import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";

export function DeliveryOptions({ cartItem, deliveryOptions, loadCart }) {
  const selectedDeliveryOptionId =
    cartItem.deliveryOptionId || deliveryOptions[0]?.id;

  const updateDeliveryOption = async (deliveryOptionId) => {
    const cart = JSON.parse(localStorage.getItem("luma-market-cart") || "[]");

    const updatedCart = cart.map((item) => {
      if (item.productId === cartItem.productId) {
        return {
          ...item,
          deliveryOptionId,
        };
      }

      return item;
    });

    localStorage.setItem("luma-market-cart", JSON.stringify(updatedCart));

    await loadCart();
  };

  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>

      {deliveryOptions.map((deliveryOption) => {
        const priceString =
          deliveryOption.priceCents > 0
            ? `${formatMoney(deliveryOption.priceCents)} - Shipping`
            : "FREE Shipping";

        const deliveryDate = dayjs()
          .add(deliveryOption.deliveryDays, "day")
          .format("dddd, MMMM D");

        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={() => updateDeliveryOption(deliveryOption.id)}
            data-testid="delivery-option"
          >
            <input
              type="radio"
              checked={deliveryOption.id === selectedDeliveryOptionId}
              onChange={() => updateDeliveryOption(deliveryOption.id)}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />

            <div>
              <div className="delivery-option-date">{deliveryDate}</div>

              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
