import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "../forms/LogIn";
import SignUpUser from "../forms/SignUpUser";
import SignUpOwner from "../forms/SignUpOwner";
import AddStoreDetails from "../forms/AddStoreDetails";
import EditStoreDetails from "../forms/EditStoreDetails";
import EditUser from "../forms/EditUser";
import AddAddress from "../forms/AddAddress";
import Home from "../Home";
import EditAddress from "../forms/EditAddress";
import EditOwner from "../forms/EditOwner";
import Products from "../Products";
import AddProduct from "../forms/AddProduct";
import Categories from "../Categories";
import AddCategory from "../forms/AddCategory";
import EditCategory from "../forms/EditCategory";


const AppRoutes = ({
  handleLogIn,
  handleUserSignUp,
  handleEditUserProfile,
  handleEditOwnerProfile,
  handleOwnerSignup,
  handleUserAddress,
  handleUserEditAddress,
  handleUserDeleteAddress,
  handleDeleteUserProfile,
  handleDeleteOwnerProfile,
  handleAddStoreDetails,
  handleEditStoreDetails,
  handleDeleteStore,
  handleAddProduct,
  handleEditProduct,
  handleDeleteProduct,
  handleAddCategory, 
  handleEditCategory,
  handleDeleteCategory,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LogIn handleLogIn={handleLogIn} />} />
      <Route
        path="/register-user"
        element={<SignUpUser handleUserSignUp={handleUserSignUp} />}
      />
      <Route
        path="/edit-user/:username"
        element={
          <EditUser
            handleEditUserProfile={handleEditUserProfile}
            handleDeleteUserProfile={handleDeleteUserProfile}
          />
        }
      />
      <Route
        path="/edit-owner/:username"
        element={
          <EditOwner
            handleEditOwnerProfile={handleEditOwnerProfile}
            handleDeleteOwnerProfile={handleDeleteOwnerProfile}
          />
        }
      />
      <Route
        path="/users-address/:username"
        element={<AddAddress handleUserAddress={handleUserAddress} />}
      />
      <Route
        path="/edit-address/:username"
        element={
          <EditAddress
            handleUserEditAddress={handleUserEditAddress}
            handleUserDeleteAddress={handleUserDeleteAddress}
          />
        }
      />
      <Route
        path="/register-owner"
        element={<SignUpOwner handleOwnerSignup={handleOwnerSignup} />}
      />
      <Route
        path="/stores/add-details/:ownerId"
        element={
          <AddStoreDetails handleAddStoreDetails={handleAddStoreDetails} />
        }
      />
      <Route
        path="/stores/edit-details/:ownerId"
        element={
          <EditStoreDetails
            handleEditStoreDetails={handleEditStoreDetails}
            handleDeleteStore={handleDeleteStore}
          />
        }
      />
      <Route path="/stores/products" element={<Products />} />
      <Route
        path="/stores/:ownerId/add-products/:storeId"
        element={<AddProduct handleAddProduct={handleAddProduct} />}
      />

      <Route path="/stores/categories" element={<Categories />} />
      <Route
        path="/stores/:ownerId/add-categories/:storeId"
        element={<AddCategory handleAddCategory={handleAddCategory}/>}
      />
      <Route
        path="/stores/:ownerId/edit-categories/:storeId"
        element={<EditCategory
           handleEditCategory={handleEditCategory}
           handleDeleteCategory={handleDeleteCategory}/>}
      />
    </Routes>
  );
};

export default AppRoutes;
