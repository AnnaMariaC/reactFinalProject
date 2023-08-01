import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Auth,
  AuthContextProvider,
  ProductDetails,
  ProductList,
  HomePage,
  Cart,
  EditProduct,
} from "~/features";
import { Nav, NotFound } from "~/components";
import { CartProvider } from "react-use-cart";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AddProduct } from "~/features/Products/AddProduct";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/add"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products/:id/edit"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </CartProvider>
    </AuthContextProvider>
  );
}
