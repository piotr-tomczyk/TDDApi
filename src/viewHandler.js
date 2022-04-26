import { Data } from "./data";
import { getUserData, getCartData, getProductData } from "./fetchData";

export const init = () => {
  const fetch_button = document.createElement("button");
  const header = document.createElement("h1");
  header.textContent = "CLICK TO FETCH DATA";
  const content = document.querySelector(".content");
  fetch_button.textContent = "fetch";
  fetch_button.addEventListener("click", async () => {
    if (content.hasChildNodes()) {
      return;
    }
    const users = await getUserData();
    const products = await getProductData();
    const carts = await getCartData();
    if (users == null || products == null || carts == null) {
      const errorMessage = document.createElement("div");
      errorMessage.textContent = "Error loading the data";
      document.querySelector(".fetch").appendChild(errorMessage);
      return;
    }
    const data = new Data(users, products, carts);
    let viewHandlers = new viewHandler(data);
    viewHandlers.showUsers();
    viewHandlers.showProducts();
    viewHandlers.showCarts();
    viewHandlers.showCategories();
    viewHandlers.showHighestValueCart();
    viewHandlers.showFutherestUsers();
  });
  document.querySelector(".fetch").appendChild(header);
  document.querySelector(".fetch").appendChild(fetch_button);
};

export class viewHandler {
  constructor(data) {
    this.data = data;
    this.users = data.users;
    this.products = data.products;
    this.carts = data.carts;
    this.body = document.querySelector(".content");
  }
  showUsers = () => {
    const usersParent = document.createElement("div");
    usersParent.className = "users";
    const usersHeader = document.createElement("h2");
    usersHeader.textContent = "USERS";
    usersParent.appendChild(usersHeader);
    for (let i = 0; i < this.users.length; i++) {
      let userChild = this.showUser(i);
      usersParent.appendChild(userChild);
    }
    this.body.appendChild(usersParent);
  };
  showUser(i) {
    let userChild = document.createElement("div");
    userChild.className = "user";

    let userID = document.createElement("div");
    userID.textContent = "ID: " + this.users[i].id;
    userID.className = "ID";

    let userAddress = document.createElement("div");

    userAddress.className = "address";
    let userCity = document.createElement("div");
    userCity.textContent = "CITY: " + this.users[i].address.city;
    let userStreet = document.createElement("div");
    userStreet.textContent = "STREET: " + this.users[i].address.street;
    let userNumber = document.createElement("div");
    userNumber.textContent = "HOUSE NUMBER: " + this.users[i].address.number;
    let userZipcode = document.createElement("div");
    userZipcode.textContent = "ZIPCODE: " + this.users[i].address.zipcode;
    userAddress.appendChild(userCity);
    userAddress.appendChild(userStreet);
    userAddress.appendChild(userNumber);
    userAddress.appendChild(userZipcode);

    let userEmail = document.createElement("div");
    userEmail.textContent = "CITY: " + this.users[i].email;
    let userUserName = document.createElement("div");
    userUserName.textContent = "USERNAME: " + this.users[i].username;
    let userFullName = document.createElement("div");
    userFullName.textContent =
      "FULL NAME: " + this.data.getFullNameOfUser(this.users[i].id - 1);
    let userPhone = document.createElement("div");
    userPhone.textContent = "PHONE NUMBER: " + this.users[i].phone;

    userChild.appendChild(userID);
    userChild.appendChild(userAddress);
    userChild.appendChild(userEmail);
    userChild.appendChild(userUserName);
    userChild.appendChild(userFullName);
    userChild.appendChild(userPhone);
    return userChild;
  }
  showProducts = () => {
    const productsParent = document.createElement("div");
    productsParent.className = "products";
    const productHeader = document.createElement("h2");
    productHeader.textContent = "PRODUCTS";
    productsParent.appendChild(productHeader);
    for (let i = 0; i < this.products.length; i++) {
      let productChild = this.showProduct(i);
      productsParent.appendChild(productChild);
    }
    this.body.appendChild(productsParent);
  };
  showProduct(i) {
    let productChild = document.createElement("div");
    productChild.className = "product";
    let productID = document.createElement("div");
    productID.textContent = "ID: " + this.products[i].id;
    let productTitle = document.createElement("div");
    productTitle.textContent = "TITLE: " + this.products[i].title;
    let productPrice = document.createElement("div");
    productPrice.textContent = "PRICE: " + this.products[i].price;
    let productDescription = document.createElement("p");
    productDescription.textContent =
      "DESCRIPTION: " + this.products[i].description;
    let productCategory = document.createElement("div");
    productCategory.textContent = "CATEGORY: " + this.products[i].category;
    let productImage = document.createElement("img");
    productImage.src = this.products[i].image;
    let productRating = document.createElement("div");
    let productRate = document.createElement("div");
    productRate.textContent = "RATING: " + this.products[i].rating.rate;
    let productCount = document.createElement("div");
    productCount.textContent =
      "NUMBER OF RATINGS: " + this.products[i].rating.count;
    productRating.appendChild(productRate);
    productRating.appendChild(productCount);
    productChild.appendChild(productID);
    productChild.appendChild(productTitle);
    productChild.appendChild(productPrice);
    productChild.appendChild(productDescription);
    productChild.appendChild(productCategory);
    productChild.appendChild(productImage);
    productChild.appendChild(productRating);
    return productChild;
  }
  showCarts = () => {
    const cartsParent = document.createElement("div");
    cartsParent.className = "carts";
    const cartsHeader = document.createElement("h2");
    cartsHeader.textContent = "CARTS";
    cartsParent.appendChild(cartsHeader);
    for (let i = 0; i < this.carts.length; i++) {
      let cartChild = this.showCart(i);
      cartsParent.appendChild(cartChild);
    }
    this.body.appendChild(cartsParent);
  };
  showCart(i) {
    let cartChild = document.createElement("div");
    cartChild.className = "cart";
    let cartID = document.createElement("div");
    cartID.textContent = "ID: " + this.carts[i].id;
    let cartUser = document.createElement("div");
    cartUser.textContent =
      "User: " + this.data.getFullNameOfUser(this.carts[i].userId);
    let cartDate = document.createElement("div");
    cartDate.textContent = "DATE: " + this.carts[i].date;
    let cartProducts = document.createElement("div");
    cartProducts.textContent = "PRODUCTS";
    cartProducts.className = "cart-products";
    let length = this.carts[i].products.length;
    for (let j = 0; j < length; j++) {
      let id = this.carts[i].products[j].productId - 1;
      let cartProduct = document.createElement("div");
      let cartProductName = document.createElement("p");
      cartProductName.textContent = "NAME: " + this.products[id].title;
      let cartProductQuantity = document.createElement("div");
      cartProductQuantity.textContent =
        "QUANTITY: " + this.carts[i].products[j].quantity;
      cartProduct.appendChild(cartProductName);
      cartProduct.appendChild(cartProductQuantity);
      cartProducts.appendChild(cartProduct);
    }
    cartChild.appendChild(cartID);
    cartChild.appendChild(cartUser);
    cartChild.appendChild(cartDate);
    cartChild.appendChild(cartProducts);
    return cartChild;
  }
  showCategories() {
    const categoriesParent = document.createElement("div");
    categoriesParent.className = "categories";
    const categoriesHeader = document.createElement("h2");
    categoriesHeader.textContent = "CATEGORIES";
    categoriesParent.appendChild(categoriesHeader);
    const categories = this.data.createCategories();
    for (let i = 0; i < categories.length; i++) {
      let categoryChild = this.showCategory(categories[i]);
      categoriesParent.appendChild(categoryChild);
    }
    this.body.appendChild(categoriesParent);
  }
  showCategory(category) {
    let categoryChild = document.createElement("div");
    categoryChild.className = "category";
    let categoryName = document.createElement("div");
    categoryName.textContent = "NAME: " + category.name;
    let categoryTotalValue = document.createElement("div");
    categoryTotalValue.textContent =
      "TOTAL VALUE OF PRODUCTS: " + category.valueOfProducts;
    categoryChild.appendChild(categoryName);
    categoryChild.appendChild(categoryTotalValue);
    return categoryChild;
  }
  showHighestValueCart() {
    const highestCart = this.data.findHighestValueCart();
    const highestCartParent = document.createElement("div");
    highestCartParent.className = "highest-carts";
    const highestCartChild = document.createElement("div");
    highestCartChild.className = "highest-cart";
    const highestCartHeader = document.createElement("h2");
    highestCartHeader.textContent = "MOST VALUABLE CART";
    highestCartParent.appendChild(highestCartHeader);
    const highestCartOwner = document.createElement("div");
    highestCartOwner.textContent = "OWNER: " + highestCart.nameOfOwner;
    const highestCartValue = document.createElement("div");
    highestCartValue.textContent = "VALUE: " + highestCart.value;
    highestCartChild.appendChild(highestCartOwner);
    highestCartChild.appendChild(highestCartValue);
    highestCartParent.appendChild(highestCartChild);
    this.body.appendChild(highestCartParent);
  }
  showFutherestUsers() {
    const futherstUsers = this.data.getFutherstUsers();
    const futherstUsersParent = document.createElement("div");
    futherstUsersParent.className = "futherst-users";
    const futherstUsersChild = document.createElement("div");
    futherstUsersChild.className = "futherst-user";
    const futherstUsersHeader = document.createElement("h2");
    futherstUsersHeader.textContent = "FUTHERST USERS";
    futherstUsersParent.appendChild(futherstUsersHeader);

    const futherstUsers1 = document.createElement("div");
    futherstUsers1.textContent = "USER1";
    futherstUsers1.appendChild(this.showUser(futherstUsers[0] - 1));
    const futherstUsers2 = document.createElement("div");
    futherstUsers2.textContent = "USER2";
    futherstUsers2.appendChild(this.showUser(futherstUsers[1] - 1));

    futherstUsersChild.appendChild(futherstUsers1);
    futherstUsersChild.appendChild(futherstUsers2);
    futherstUsersParent.appendChild(futherstUsersChild);
    this.body.appendChild(futherstUsersParent);
  }
}
