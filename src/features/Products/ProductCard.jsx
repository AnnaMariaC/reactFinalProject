import { Link } from "react-router-dom";
import { configureApi } from "~/helpers/api.helper";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "..";
import { toast } from "react-toastify";
import styles from "./Products.module.css";
import { useState } from "react";

const { remove } = configureApi("products");

export function ProductCard({ product }) {
  const [products, setProducts] = useState(null);
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  async function handleDeleteProduct(productId) {
    await toast.promise(remove(productId, { accessToken }), {
      pending: "Delete, please wait ...",
      success: "Your product has been delete.",
      error: "You are not authorizated",
    });
    navigate("/");
    setProducts(products.filter((item) => item.id !== productId));
  }
  return (
    <>
      <article>
        <Link to={`${product.id}`}>
          <img src={product.picture} alt={`${product.name}`} />
        </Link>
      </article>
      <div className={styles.textTrash}>
        <h3>{product.name}</h3>
        {user && (
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className={styles.deleteBtn}
          >
            <TrashIcon width="15" />
          </button>
        )}
      </div>
    </>
  );
}
