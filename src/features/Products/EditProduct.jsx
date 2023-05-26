import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Input, Textarea } from "~/components";
import { configureApi } from "~/helpers/api.helper";
import { useAuth } from "~/features";
import { useEffect, useState } from "react";

import styles from "./Products.module.css";
import { ProductSkeleton } from "./ProductSkeleton";

// creare api pentru a adauga informatiile din formula in DB

const { get: getProduct } = configureApi("products");
const { update } = configureApi("products");
const { get: getBrand } = configureApi("brands");

// schema cu yup form pentru formular
const schema = object({
  name: string().required("Please provide a name!").min(3),
  description: string().min(100, "At least 100 characters"),
  price: number().required("Please provide a price").min(1),
  stock: number().min(1),
});

export function EditProduct() {
  const [product, setProduct] = useState(null);
  const [brand, setBrand] = useState(null);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //pentru default value la campuri imi incarc datele
  useEffect(() => {
    async function loadData() {
      const product = await getProduct(id);
      const brand = await getBrand(product.brandId);
      setProduct(product);
      setBrand(brand);
    }
    loadData();
  }, [id]);

  //din useAuth destructuram accesToken pentru a-l folosi ulterior
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  // functie de promisiune de trimitere a datelor si accestoken
  // async function handleEditProduct(e) {
  //   e.preventDefault();

  //   const form = e.target;
  //   const data = new FormData(form);
  //   const productUpdatData = Object.fromEntries(data.entries());

  //   console.log(productUpdatData);
  //   update(product.id, productUpdatData, { accessToken });
  //   navigate("/products");
  // }
  async function handleEditProduct(data) {
    const newProduct = { ...data, userId: user.id };
    await toast.promise(update(id, newProduct, { accessToken }), {
      pending: "Editing a product, please wait ...",
      success: "Your product has been edit.",
      error: "You are not authorized",
    });
    navigate("/products");
  }

  const bindToHookForm = {
    register,
    errors,
  };
  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <>
      <h2>Edit product</h2>

      <form className="pageForm" onSubmit={handleSubmit(handleEditProduct)}>
        <img
          className={styles.imgSmall}
          src={product.picture}
          alt={product.name}
        />
        <h1>{brand.name}</h1>
        <Input
          type="text"
          name="name"
          defaultValue={product.name}
          label="Product name: "
          {...bindToHookForm}
        />
        <Textarea
          name="description"
          label="Description: "
          className={styles.textarea}
          defaultValue={product.description}
          {...bindToHookForm}
        />
        <Input
          type="number"
          name="price"
          label="Price (lei): "
          min="0"
          step="0.01"
          defaultValue={product.price}
          {...bindToHookForm}
        />
        <Input
          type="number"
          name="stock"
          defaultValue={product.stock}
          label="Amount:"
          min="1"
          {...bindToHookForm}
        />
        <Button variant="primary" className="submitBtn">
          {<PencilSquareIcon width={20} />}
          Update product
        </Button>
      </form>
    </>
  );
}
