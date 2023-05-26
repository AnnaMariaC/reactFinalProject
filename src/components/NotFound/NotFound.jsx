import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="notFoundContainer">
      <h1>Page Error 404 Not Found</h1>
      <Link to="/products">Go to products page</Link>
    </div>
  );
}
