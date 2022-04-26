require("babel-core/register");
require("babel-polyfill");

import fetchMock from "jest-fetch-mock";
import { users, products, carts } from "../assets/sample_data";

import { getUserData, getCartData, getProductData } from "../src/fetchData";

fetchMock.enableMocks();

beforeEach(() => {
  fetch.resetMocks();
});

it("fetch user data with succes", async () => {
  fetch.mockResponseOnce(JSON.stringify(users));
  const usersData = await getUserData();
  expect(usersData.length).toEqual(10);
});

it("fetch products data with succes", async () => {
  fetch.mockResponseOnce(JSON.stringify(products));
  const productsData = await getProductData();
  expect(productsData.length).toEqual(20);
});

it("fetch carts data with succes", async () => {
  fetch.mockResponseOnce(JSON.stringify(carts));
  const cartsData = await getCartData();
  expect(cartsData.length).toEqual(7);
});

it("fetch user data with error", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));
  const usersData = await getUserData();
  expect(usersData).toEqual(null);
});

it("fetch products data with error", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));
  const productsData = await getProductData();
  expect(productsData).toEqual(null);
});

it("fetch carts data with error", async () => {
  fetch.mockReject(() => Promise.reject("API is down"));
  const cartsData = await getCartData();
  expect(cartsData).toEqual(null);
});
