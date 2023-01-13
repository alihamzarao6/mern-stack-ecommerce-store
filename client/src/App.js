import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WebFont from "webfontloader";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import Protected from "./components/Route/Protected";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductsList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      "http://localhost:5000/api/v1/stripeapikey",
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<LoginSignUp />} />
        <Route
          path="/account"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/password/update"
          element={
            <Protected>
              <UpdatePassword />
            </Protected>
          }
        />
        <Route
          path="/me/update"
          element={
            <Protected>
              <UpdateProfile />
            </Protected>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login/shipping"
          element={
            <Protected>
              <Shipping />
            </Protected>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <Protected>
              <ConfirmOrder />
            </Protected>
          }
        />

        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Protected>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </Protected>
            }
          />
        )}

        <Route path="/success" element={<OrderSuccess />} />

        <Route
          path="/orders"
          element={
            <Protected>
              <MyOrders />
            </Protected>
          }
        />

        <Route
          path="/order/:id"
          element={
            <Protected>
              <OrderDetails />
            </Protected>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <Protected isAdmin={true}>
              <Dashboard />
            </Protected>
          }
        />

        <Route
          path="/admin/products"
          element={
            <Protected isAdmin={true}>
              <ProductsList />
            </Protected>
          }
        />

        <Route
          path="/admin/product"
          element={
            <Protected isAdmin={true}>
              <NewProduct />
            </Protected>
          }
        />

        <Route
          path="/admin/product/:id"
          element={
            <Protected isAdmin={true}>
              <UpdateProduct />
            </Protected>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <Protected isAdmin={true}>
              <OrderList />
            </Protected>
          }
        />

        <Route
          path="/admin/order/:id"
          element={
            <Protected isAdmin={true}>
              <ProcessOrder />
            </Protected>
          }
        />

        <Route
          path="/admin/users"
          element={
            <Protected isAdmin={true}>
              <UsersList />
            </Protected>
          }
        />

        <Route
          path="/admin/user/:id"
          element={
            <Protected isAdmin={true}>
              <UpdateUser />
            </Protected>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <Protected isAdmin={true}>
              <ProductReviews />
            </Protected>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
