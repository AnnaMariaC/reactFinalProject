import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "~/features";

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuth();
  //ne asiguram ca nu poate intra cineva neautentificat pe link
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: pathname } });
    }
  }, [user, navigate, pathname]);
  if (!user) {
    return null;
  }
  return children;
}
