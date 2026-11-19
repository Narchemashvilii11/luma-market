import dayjs from "dayjs";

export function DeliveryDate({ deliveryOptions, cartItem }) {
  const selectedDeliveryOption =
    deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId) ||
    deliveryOptions[0];

  if (!selectedDeliveryOption) {
    return null;
  }

  const estimatedDeliveryDate = dayjs()
    .add(selectedDeliveryOption.deliveryDays, "day")
    .format("dddd, MMMM D");

  return (
    <div className="delivery-date">Delivery date: {estimatedDeliveryDate}</div>
  );
}
