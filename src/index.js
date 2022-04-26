import { getCartData, getProductData, getUserData } from "./fetchData";
const test = async () => {
  const users = await getUserData();
  console.log(users);
  const products = await getProductData();
  console.log(products);
  const carts = await getCartData();
  console.log(carts);
};

window.onload = async () => {
  await test();
};
