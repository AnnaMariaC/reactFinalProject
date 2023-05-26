import { useCart } from "react-use-cart";
import styles from "./Cart.module.css";
import {
  MinusSmallIcon,
  PlusSmallIcon,
  ShoppingBagIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export function Cart() {
  const {
    isEmpty,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  if (isEmpty)
    return (
      <div className={styles.emptyShoppingBag}>
        <ShoppingBagIcon width="400" />
        <h2>You Cart is Empty</h2>
        <h3>Add something</h3>
      </div>
    );
  return (
    <section>
      <div className={styles.containerDivCart}>
        <div>
          <table className={styles.tableCart}>
            <thead>
              <tr>
                <th>Picture</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>
                  <h4>Total price: {cartTotal} lei</h4>
                </th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <img src={item.picture} alt={item.name} />
                    </td>
                    <td>{item.name}</td>

                    <td className={styles.quantityButton}>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <MinusSmallIcon width="15" />
                      </button>{" "}
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateItemQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <PlusSmallIcon width="15" />
                      </button>
                    </td>
                    <td>{item.price} lei</td>
                    <td>
                      <button
                        className={styles.deleteItem}
                        onClick={() => removeItem(item.id)}
                      >
                        <XCircleIcon width="25" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div>
          <button className={styles.deleteAllItems} onClick={() => emptyCart()}>
            Empty Cart
          </button>
        </div>
      </div>
    </section>
  );
}
