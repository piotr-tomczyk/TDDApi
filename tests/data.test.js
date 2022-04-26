import { Data } from "../src/data";
import {
  users,
  products,
  carts,
  categories,
  users_small,
  products_small,
  carts_small,
  user_geo,
} from "../assets/sample_data";

it("list categories of products", () => {
  const data = new Data(users, products, carts);
  expect(data.getAllCategories()).toEqual(categories);
});

it("total value of products of a given category", () => {
  const data = new Data(users, products, carts);
  expect(data.totalValueOfProducts("electronics")).toEqual("1994.99");
});

it("create categories structure", () => {
  const data = new Data(users, products, carts);
  const categories = data.createCategories();
  expect(categories[2]).toEqual({
    name: "electronics",
    valueOfProducts: "1994.99",
  });
});

it("get full name of user", () => {
  const data = new Data(users_small, products_small, carts_small);
  expect(data.getFullNameOfUser(0)).toEqual("John Smith");
});

it("find cart with highest value", () => {
  const data = new Data(users_small, products_small, carts_small);
  const cart = data.findHighestValueCart();
  expect(cart).toEqual({ value: 4, nameOfOwner: "John Smith" });
});

it("calculate distance between 2 users", () => {
  const data = new Data(user_geo, products_small, carts_small);
  expect(data.getDistanceBetweenUsers(1, 2)).toEqual(8398);
});

it("find users with biggest distance", () => {
  const data = new Data(user_geo, products_small, carts_small);
  expect(data.getFutherstUsers()).toEqual([2, 4]);
});
