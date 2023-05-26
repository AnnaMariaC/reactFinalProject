import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "../../features";

import styles from "./Nav.module.css";
import { BreadCrumbs } from "../BreadCrumbs/BreadCrumbs";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";
//functie pentru a stiliza elementele din meniu
function BrandNavLink({ children, className, ...props }) {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(className, { [styles.active]: isActive })
      }
      {...props}
    >
      {children}
    </NavLink>
  );
}

export function Nav({ size }) {
  // destructurare user si logout din useAuth
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  //functia de logout
  function handleLogout(e) {
    e.preventDefault();

    logout();
    navigate("/");
  }

  return (
    <>
      <nav className={styles["main-menu"]}>
        <menu>
          <li className={styles.shop}>
            <NavLink to="/">My Online Shop</NavLink>
          </li>
          <li className={styles.pushRight}>
            <BrandNavLink to="/products">Products</BrandNavLink>
          </li>
          {/* daca suntem logati sa vedem add altfel nu */}
          {user && (
            <li>
              <BrandNavLink to="/products/add">Add product</BrandNavLink>
            </li>
          )}
          {/* daca suntem logati sa apara mesajul Hello si numele si logout */}
          {user && (
            <>
              <li className={styles.pushRight}>
                Hello {user.firstName}!{" "}
                <a href="/products" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li>
                <BrandNavLink to="/cart">
                  <ShoppingCartIcon className={styles.cartIcon} />
                  <sup className={styles.cartQantity}>{totalItems}</sup>
                </BrandNavLink>
              </li>
            </>
          )}
          {/* daca nu suntem logati sa apara login si register */}
          {!user && (
            <>
              <li className={styles.pushRight}>
                <BrandNavLink to="/login">Login</BrandNavLink>
              </li>
              <li>
                <BrandNavLink to="/register">Register</BrandNavLink>
              </li>
            </>
          )}
        </menu>
      </nav>
      <BreadCrumbs />
    </>
  );
}
