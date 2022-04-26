require("babel-core/register");
require("babel-polyfill");
export const getUserData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/users");
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getProductData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const getCartData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/carts");
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
