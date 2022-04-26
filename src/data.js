export class Data {
  constructor(users, products, carts) {
    this.users = users;
    this.products = products;
    this.carts = carts;
  }
  getAllCategories() {
    let categories = [];
    for (let i = 0; i < this.products.length; i++) {
      let isCategory = categories.filter((category) => {
        return category == this.products[i].category;
      });
      if (isCategory.length == 0) {
        categories.push(this.products[i].category);
      }
    }
    return categories;
  }
  totalValueOfProducts(category) {
    let sum = 0;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].category == category) {
        sum += this.products[i].price;
      }
    }
    return sum.toFixed(2);
  }
  createCategories() {
    const categories = [];
    const categoriesNames = this.getAllCategories();
    for (let i = 0; i < categoriesNames.length; i++) {
      categories.push(
        new Category(
          categoriesNames[i],
          this.totalValueOfProducts(categoriesNames[i])
        )
      );
    }
    return categories;
  }
  findHighestValueCart() {
    let cart = new Cart(0, "");
    for (let i = 0; i < this.carts.length; i++) {
      let sum = 0;
      let lenght = this.carts[i].products.length;
      for (let j = 0; j < lenght; j++) {
        let productID = this.carts[i].products[j].productId;
        let productQuantity = this.carts[i].products[j].quantity;
        let priceOfProduct = this.products[productID - 1].price;
        sum += priceOfProduct * productQuantity;
      }
      if (sum >= cart.value) {
        cart.value = sum;
        cart.nameOfOwner = this.getFullNameOfUser(this.carts[i].userId - 1);
      }
    }
    return cart;
  }
  getFullNameOfUser(id) {
    let user = this.users[id];
    return user.name.firstname + " " + user.name.lastname;
  }
  getFutherstUsers() {
    let length = this.users.length;
    let maxDistance = 0;
    let usersID = [0, 0];
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        let user1ID = this.users[i].id;
        let user2ID = this.users[j].id;
        let tempLength = this.getDistanceBetweenUsers(user1ID, user2ID);
        if (tempLength > maxDistance) {
          maxDistance = tempLength;
          usersID = [user1ID, user2ID];
        }
      }
    }
    return usersID;
  }

  getDistanceBetweenUsers(user1ID, user2ID) {
    let user1Geo = this.users[user1ID - 1].address.geolocation;
    let user2Geo = this.users[user2ID - 1].address.geolocation;
    let Radius = 6371;
    let dLat = this.deg2Rad(user2Geo.lat - user1Geo.lat);
    let dLon = this.deg2Rad(user2Geo.long - user1Geo.long);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2Rad(user1Geo.lat)) *
        Math.cos(this.deg2Rad(user2Geo.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = Radius * c;
    return Math.round(distance);
  }

  deg2Rad(degrees) {
    return degrees * (Math.PI / 180);
  }
}

export class Category {
  constructor(name, valueOfProducts) {
    this.name = name;
    this.valueOfProducts = valueOfProducts;
  }
}

export class Cart {
  constructor(value, nameOfOwner) {
    this.value = value;
    this.nameOfOwner = nameOfOwner;
  }
}
