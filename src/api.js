import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class YourStoreAPI {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.log("API CALL:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = {
      Authorization: `Bearer ${YourStoreAPI.token}`,
      "Content-Type": "application/json",
    };

    const requestData = method === "get" ? { params: data } : { data };

    try {
      return (await axios({ url, method, headers, ...requestData })).data;
    } catch (err) {
      console.error("API error", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async loginUserOrOwner(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signupUser(data) {
    let res = await this.request(`auth/register-user`, data, "post");
    return res.token;
  }

  static async getUser(userId) {
    let res = await this.request(`users/${userId}`);
    return res.user;
  }

  static async editUser(userId, updatedData) {
    let res = await this.request(`users/${userId}`, updatedData, "put");
    return res;
  }

  static async removeUser(userId, data = undefined) {
    let res = await this.request(`users/${userId}`, data, "delete");
    return res;
  }

  static async signupOwner(data) {
    let res = await this.request(`auth/register-owner`, data, "post");
    return res.token;
  }

  static async getOwner(ownerId) {
    let res = await this.request(`owners/${ownerId}`);
    return res.owner;
  }

  static async editOwner(ownerId, updatedData) {
    let res = await this.request(`owners/${ownerId}`, updatedData, "put");
    return res.updatedOwner;
  }

  static async removeOwner(ownerId, data = undefined) {
    let res = await this.request(`owners/${ownerId}`, data, "delete");
    return res;
  }

  static async addAddress(userId, data) {
    let res = await this.request(`users/address/${userId}`, data, "post");
    return res.address;
  }

  static async editAddress(userId, updatedData) {
    let res = await this.request(`users/address/${userId}`, updatedData, "put");
    return res.updatedAddress;
  }

  static async removeAddress(userId, data = undefined) {
    let res = await this.request(`users/address/${userId}`, data, "delete");
    return res;
  }

  static async createStore(ownerId, data) {
    let res = await this.request(`stores/${ownerId}`, data, "post");
    return res.store;
  }

  static async getStore(ownerId) {
    let res = await this.request(`stores/${ownerId}`);
    return res.store;
  }

  static async updateStore(ownerId, updatedData) {
    let res = await this.request(`stores/${ownerId}`, updatedData, "put");
    return res.updatedStore;
  }

  static async removeStore(ownerId, data = undefined) {
    let res = await this.request(`stores/${ownerId}`, data, "delete");
    return res;
  }

  static async createProduct(ownerId, storeId, data) {
    let res = await this.request(`stores/${ownerId}/products/${storeId}`, data, "post");
    return res.product;
  }

  static async getProduct(ownerId, productId) {
    let res = await this.request(`stores/${ownerId}/products/${productId}`);
    return res.product
  }

  static async getProducts(ownerId, storeId) {
    let res = await this.request(`stores/${ownerId}/products/all/${storeId}`);
    return res.products
  }

  static async updateProduct(ownerId, productId, updatedData) {
    let res = await this.request(`stores/${ownerId}/products/${productId}`,updatedData, "put" );
    return res.updatedProduct
  }

  static async removeProduct(ownerId, productId, data= undefined) {
    let res = await this.request(`stores/${ownerId}/products/${productId}`, data, "delete");
    return res;
  }
  static async createCategory(ownerId, storeId, data) {
    let res = await this.request(`stores/${ownerId}/categories/${storeId}`, data, "post");
    return res.category;
  }

  static async getCategory(ownerId, categoryId) {
    let res = await this.request(`stores/${ownerId}/categories/${categoryId}`);
    return res.category
  }

  static async getCategories(ownerId, storeId) {
    let res = await this.request(`stores/${ownerId}/categories/all/${storeId}`);
    return res.categories
  }

  static async updateCategory(ownerId, categoryId, updatedData) {
    let res = await this.request(`stores/${ownerId}/categories/${categoryId}`,updatedData, "put" );
    return res.updatedCategory
  }

  static async removeCategory(ownerId, categoryId, data= undefined) {
    let res = await this.request(`stores/${ownerId}/categories/${categoryId}`, data, "delete");
    return res;
  }


}

export default YourStoreAPI;
