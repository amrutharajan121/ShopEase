export function getCartKey() {
  const token = localStorage.getItem("token");

  if (!token) {
    return "guest_cart";
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const userId =
      payload.id ||
      payload.userId ||
      payload._id ||
      payload.email;

    if (userId) {
      return `cart_${userId}`;
    }
  } catch (error) {
    console.error("Invalid token:", error);
  }

  return "guest_cart";
}