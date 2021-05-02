export default function formatPrice(price) {
  return price.toLocaleString(undefined, {
    currency: "USD",
    style: "currency",
  });
}
