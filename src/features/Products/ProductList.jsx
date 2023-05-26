import { useEffect, useState } from "react";
import { configureApi } from "~/helpers/api.helper";
import { ProductCard } from "./ProductCard";

import styles from "./Products.module.css";

const { get } = configureApi("products");

export function ProductList() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    get().then(setProducts);
  }, []);

  return (
    <section className={styles.product}>
      <h2>Our newest products</h2>

      {products?.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </section>
  );
}
