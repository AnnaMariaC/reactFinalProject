import { NavLink, Route, Routes } from "react-router-dom";
import { ProductList } from "./ProductList";
import { ProductDetails } from "./ProductDetails";
import styles from "./Products.module.css";

export function ProductLayout() {
  return (
    <>
      <nav className={styles.nav}>
        <h1>Products</h1>
        <NavLink to="/products">Products List</NavLink>
      </nav>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path=":id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}
