import { Link } from "react-router-dom";
import style from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={style.homepage}>
      <h1>Welcome to our online store</h1>
      <p>
        Be free to explore all our <Link to="/products">products</Link>
      </p>
    </div>
  );
}
