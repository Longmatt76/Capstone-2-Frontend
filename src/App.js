import "./static/css/App.css";
import React, { useState, useEffect } from "react";
import Navbar from "./navigation/Navbar";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./navigation/AppRoutes";
import jwt from "jsonwebtoken";
import YourStoreAPI from "./api";
import useLocalStorage from "./hooks/useLocalStorage";
import UserContext from "./contexts/UserContext";
import { ThemeProvider } from "@emotion/react";
import themes from "./themes";
import CartProvider from "./contexts/CartContext";
import CarouselProvider from "./contexts/CarouselContext";
import { Toaster } from "react-hot-toast";

function App() {
  const [token, setToken] = useLocalStorage("token", "app");
  const [currentUser, setCurrentUser] = useState();
  const [currentStore, setCurrentStore] = useState();
  const [productSearch, setProductSearch] = useState();

  const currentThemeKey = currentStore?.theme || "ThemeOne";
  const currentTheme = themes[currentThemeKey];
  const theme = currentTheme(currentStore);

  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        const decodedToken = jwt.decode(token);
        YourStoreAPI.token = token;

        let currentUserData;

        if (decodedToken.userId) {
          currentUserData = await YourStoreAPI.getUser(decodedToken.userId);
        } else if (decodedToken.ownerId) {
          currentUserData = await YourStoreAPI.getOwner(decodedToken.ownerId);
        }
        setCurrentUser(currentUserData);
      }
    }
    getUserInfo();
  }, [token]);

  useEffect(() => {
    async function getStoreInfo() {
      if (token) {
        const decodedToken = jwt.decode(token);
        YourStoreAPI.token = token;
        let currentStoreData;
        if (decodedToken.ownerId) {
          try {
            currentStoreData = await YourStoreAPI.getStore(
              decodedToken.ownerId
            );
            setCurrentStore(currentStoreData);
          } catch (error) {
            setCurrentStore(undefined);
          }
        }
      }
    }
    getStoreInfo();
  }, [token]);

  const handleLogOut = () => {
    setCurrentUser(null);
    setToken(null);
  };

  async function handleLogIn(data) {
    const userToken = await YourStoreAPI.loginUserOrOwner(data);
    setToken(userToken);
    return userToken;
  }

  async function handleUserSignUp(data) {
    const userToken = await YourStoreAPI.signupUser(data);
    setToken(userToken);
    return userToken;
  }

  async function handleOwnerSignup(data) {
    const ownerToken = await YourStoreAPI.signupOwner(data);
    setToken(ownerToken);
    return ownerToken;
  }

  async function handleEditUserProfile(userId, updatedData) {
    await YourStoreAPI.editUser(userId, updatedData);
    const updatedUser = await YourStoreAPI.getUser(userId);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  async function handleDeleteUserProfile(userId) {
    const res = await YourStoreAPI.removeUser(userId);
    handleLogOut(currentUser);
    return res;
  }

  async function handleEditOwnerProfile(ownerId, updatedData) {
    await YourStoreAPI.editOwner(ownerId, updatedData);
    const updatedOwner = await YourStoreAPI.getOwner(ownerId);
    setCurrentUser(updatedOwner);
    return updatedOwner;
  }

  async function handleDeleteOwnerProfile(ownerId) {
    const res = await YourStoreAPI.removeOwner(ownerId);
    handleLogOut(currentUser);
    return res;
  }

  async function handleUserAddress(userId, data) {
    await YourStoreAPI.addAddress(userId, data);
    const updatedUser = await YourStoreAPI.getUser(userId);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  async function handleUserEditAddress(userId, data) {
    await YourStoreAPI.editAddress(userId, data);
    const updatedUser = await YourStoreAPI.getUser(userId);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  async function handleUserDeleteAddress(userId) {
    await YourStoreAPI.removeAddress(userId);
    const updatedUser = await YourStoreAPI.getUser(userId);
    setCurrentUser(updatedUser);
    return updatedUser;
  }

  async function handleAddStoreDetails(ownerId, data) {
    await YourStoreAPI.createStore(ownerId, data);
    const store = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(store);
    return store;
  }

  async function handleEditStoreDetails(ownerId, updatedData) {
    await YourStoreAPI.updateStore(ownerId, updatedData);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleDeleteStore(ownerId) {
    const res = await YourStoreAPI.removeStore(ownerId);
    setCurrentStore(null);
    return res;
  }

  async function handleAddProduct(ownerId, storeId, data) {
    await YourStoreAPI.createProduct(ownerId, storeId, data);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleEditProduct(ownerId, productId, updatedData) {
    await YourStoreAPI.updateProduct(ownerId, productId, updatedData);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleDeleteProduct(ownerId, productId) {
    await YourStoreAPI.removeProduct(ownerId, productId);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleAddCategory(ownerId, storeId, data) {
    await YourStoreAPI.createCategory(ownerId, storeId, data);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleEditCategory(ownerId, categoryId, updatedData) {
    await YourStoreAPI.updateCategory(ownerId, categoryId, updatedData);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleDeleteCategory(ownerId, categoryId) {
    await YourStoreAPI.removeCategory(ownerId, categoryId);
    const updatedStore = await YourStoreAPI.getStore(ownerId);
    setCurrentStore(updatedStore);
    return updatedStore;
  }

  async function handleCheckout(ownerId, userId, data) {
    await YourStoreAPI.checkout(ownerId, userId, data)
      .then((res) => {
        if (res.url) {
          window.location.href = res.url;
        }
      })
      .catch((err) => console.log(err));
  }

  async function handleAddCarousel(ownerId, storeId, data) {
    const carousel = await YourStoreAPI.createCarousel(ownerId, storeId, data);
    return carousel
  }

  async function handleEditCarousel(ownerId, storeId, updatedData) {
    const carousel = await YourStoreAPI.updateCarousel(
      ownerId,
      storeId,
      updatedData
    );
    return carousel;
  }

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContext.Provider
            value={{
              currentUser: currentUser,
              setCurrentUser,
              currentStore: currentStore,
              setCurrentStore,
              productSearch: productSearch,
              setProductSearch
            }}
          >
            <CartProvider>
              <CarouselProvider>
                <Navbar logOut={handleLogOut} handleCheckout={handleCheckout} />
                <Toaster />
                <AppRoutes
                  handleLogIn={handleLogIn}
                  handleUserSignUp={handleUserSignUp}
                  handleEditUserProfile={handleEditUserProfile}
                  handleEditOwnerProfile={handleEditOwnerProfile}
                  handleOwnerSignup={handleOwnerSignup}
                  handleUserAddress={handleUserAddress}
                  handleUserEditAddress={handleUserEditAddress}
                  handleUserDeleteAddress={handleUserDeleteAddress}
                  handleDeleteUserProfile={handleDeleteUserProfile}
                  handleDeleteOwnerProfile={handleDeleteOwnerProfile}
                  handleAddStoreDetails={handleAddStoreDetails}
                  handleEditStoreDetails={handleEditStoreDetails}
                  handleDeleteStore={handleDeleteStore}
                  handleAddProduct={handleAddProduct}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                  handleAddCategory={handleAddCategory}
                  handleEditCategory={handleEditCategory}
                  handleDeleteCategory={handleDeleteCategory}
                  handleAddCarousel={handleAddCarousel}
                  handleEditCarousel={handleEditCarousel}
                />
              </CarouselProvider>
            </CartProvider>
          </UserContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
