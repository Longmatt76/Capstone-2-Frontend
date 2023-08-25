import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class YourStoreAPI {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.log("API CALL:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${YourStoreAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
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
    return res.user;
  }

  static async removeUser(userId) {
    let res = await this.request(`users/${userId}`, {}, "delete");
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

  static async removeOwner(ownerId) {
    let res = await this.request(`owners/${ownerId}`, {}, "delete");
    return res;
  }

  static async addAddress(userId, data) {
    let res = await this.request(`users/address/${userId}`, data, "post");
    res.address;
  }

  static async editAddress(userId, updatedData) {
    let res = await this.request(`users/address/${userId}`, updatedData, "put");
    return res.updatedAddress;
  }

  static async removeAddress(userId) {
    let res = await this.request(`users/address/${userId}`, "delete");
    return res;
  }
}

export default YourStoreAPI;
