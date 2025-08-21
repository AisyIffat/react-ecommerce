import { toast } from "sonner";

// add product to cart
export function AddToCart(product) {
  const dataInLocalStorage = localStorage.getItem("carts");
  const carts = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];

  let updatedCarts;

  const existingItem = carts.find((cart) => {
    if (product._id === cart.id) {
      return true;
    } else {
      return false;
    }
  });

  if (existingItem) {
    updatedCarts = carts.map((cart) =>
      cart.id === product._id ? { ...cart, quantity: cart.quantity + 1 } : cart
    );
  } else {
    updatedCarts = [
      ...carts,
      {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        quantity: 1,
      },
    ];
  }

  localStorage.setItem("carts", JSON.stringify(updatedCarts));
  toast("Product added to cart");
  updateCart(carts);
  return true;
}

// get all the items in the cart
export function getCart() {
  return JSON.parse(localStorage.getItem("carts")) || [];
}

// update the cart to local storage
export function updateCart(carts) {
  updateCart(carts);
  return true;
}

// delete items from the cart
export function deleteItemFromCart(id) {
  const dataInLocalStorage = localStorage.getItem("carts");
  const carts = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
  const updatedCarts = carts.filter((cart) => cart.id !== id);
  localStorage.setItem("carts", JSON.stringify(updatedCarts));
  toast.success("Product has been deleted");
}
