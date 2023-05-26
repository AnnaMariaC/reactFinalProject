import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { configureApi } from "~/helpers/api.helper";
import { ProductSkeleton } from "./ProductSkeleton";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "react-use-cart";

import styles from "./Products.module.css";
import { useAuth } from "~/features";

const { get: getProduct } = configureApi("products");
const { get: getBrand } = configureApi("brands");

export function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  // const [cart, setCart] = useState([]);
  const { addItem } = useCart([]);

  useEffect(() => {
    async function loadData() {
      const product = await getProduct(id);
      const brand = await getBrand(product.brandId);
      setProduct(product);
      setBrand(brand);
    }
    loadData();
  }, [id]);
  //functie de adaugare element in cos onclick pe button

  const addToCart = () => {
    addItem(product);
  };

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <article className={styles.detailsProduct}>
      <img src={product.picture} alt={product.name} />
      <div className={styles.detailsDiv}>
        <h1>
          {brand.name} {product.name}
        </h1>
        <p>Product: {product.id}</p>
        {user.id === product.userId && (
          <Link to={`edit`}>Edit this product</Link>
        )}
        <p className={styles.descriptionProduct}>{product.description}</p>
        <h4>Price: {product.price} lei</h4>

        <p>Stock: {product.stock}</p>
        <button
          className={styles.addToCartButton}
          onClick={() => addToCart(product)}
        >
          Add to Cart <ShoppingCartIcon width="20" />
        </button>
      </div>
    </article>
  );
}
