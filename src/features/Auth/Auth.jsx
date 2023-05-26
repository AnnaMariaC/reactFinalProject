import {
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";

import { configureApi } from "../../helpers/api.helper";
import { Button } from "../../components/Button/Button";

import styles from "./Auth.module.css";
import { useAuth } from "./Auth.context";
import { toast } from "react-toastify";
import { Input } from "~/components";

const { add: apiRegister } = configureApi("register");
const { add: apiLogin } = configureApi("login");

// validator complet pentru login
const baseValidator = {
  email: string()
    .required("Please enter an email")
    .email("Please provide a valid email"),
  password: string()
    .required("Please enter a password")
    .min(6, "The password must have minim 6 characters"),
};
const loginSchema = object(baseValidator);
// validator complet pentru register
const registerSchema = object({
  ...baseValidator,
  retype_password: string()
    .required("Please type your password again")
    .oneOf([ref("password")], "Password don't match!"),
  firstName: string().required("Please enter your first name"),
  lastName: string().required("Please enter your last name"),
});
export function Auth() {
  const { pathname: path } = useLocation();
  const isRegister = path === "/register";
  //destructurare  useForm pentru validare form
  // la resolver punem in functie de unde este pe register sau login
  // sa ia schema aferenta
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleAuth(data) {
    //nu avem nevoie de retype password asa ca il destructuram din odj data
    //punem retul proprietatlor in newUser
    const { retype_password, ...newUser } = data;

    // functie de verificare unde suntem pe register sau pe login
    try {
      let func = apiRegister;
      if (!isRegister) {
        func = apiLogin;
      }
      // folosim toast pentru a afisa mesajul de asteptare eroare sau succes
      const auth = await toast.promise(func(newUser), {
        pending:
          "We are logging you in, it's only going to take a few seconds!",
        error: { render: ({ data }) => data.message },
        success: "You have logged successfully",
      });

      login(auth);
      navigate("/products");
      // in caz de eroare affisam eroare tot cu toast
    } catch (e) {
      throw e;
    }
  }
  const bindToHookForm = {
    register,
    errors,
  };

  return (
    <>
      <h1>{isRegister ? "Register" : "Login"}</h1>

      <form className="pageForm" onSubmit={handleSubmit(handleAuth)}>
        <Input type="email" label="Email" name="email" {...bindToHookForm} />
        <Input
          type="password"
          label="Password"
          name="password"
          {...bindToHookForm}
        />

        {isRegister && (
          <>
            {" "}
            <Input
              type="password"
              label="Retype Password"
              name="retype_password"
              {...bindToHookForm}
            />
            <Input
              type="text"
              label="First Name"
              name="firstName"
              {...bindToHookForm}
            />
            <Input
              type="text"
              label="Last Name"
              name="lastName"
              {...bindToHookForm}
            />
          </>
        )}
        {!isRegister && (
          <p className={styles.pText}>
            If you don't have an account please{" "}
            <Link to="/register">Sign up</Link>
          </p>
        )}
        <Button className="submitBtn" variant="primary">
          {isRegister ? "Register" : "Login"}
          {isRegister && <UserPlusIcon width={20} />}
          {!isRegister && <ArrowRightOnRectangleIcon width={20} />}
        </Button>
      </form>
    </>
  );
}
