import { PlusIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { number, object, string } from "yup";
import { useNavigate } from "react-router-dom";

import { Button, Input, Select, Textarea } from "~/components";
import { configureApi } from "~/helpers/api.helper";
import { useAuth } from "~/features";

// schema cu yup form pentru formular
const schema = object({
  name: string().required("Please provide a name!").min(3),
  picture: string().required("Please provide a valid URL for picture!").url(),
  description: string().min(100, "At least 100 characters"),
  price: number().required("Please provide a price").min(1),
  stock: number().min(1),
  brandId: number().positive(),
  categoryId: number().positive(),
});
// creare api pentru a adauga informatiile din formula in DB
const { add } = configureApi("products");

export function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //din useAuth destructuram accesToken pentru a-l folosi ulterior
  const { accessToken, user } = useAuth();
  const navigate = useNavigate();

  // functie de promisiune de trimitere a datelor si accestoken
  async function handleAddProduct(data) {
    const newProduct = { ...data, userId: user.id };
    await toast.promise(add(newProduct, { accessToken }), {
      pending: "Adding a product, please wait ...",
      success: "Your product has been added.",
      error: {
        render: ({ data }) => data.message,
      },
    });

    navigate("/");
  }

  const bindToHookForm = {
    register,
    errors,
  };
  return (
    <>
      <h2>Add a new product</h2>
      <form className="pageForm" onSubmit={handleSubmit(handleAddProduct)}>
        <Input
          type="text"
          name="name"
          label="Product name"
          {...bindToHookForm}
        />
        <Input type="url" name="picture" label="Picture" {...bindToHookForm} />

        <Textarea name="description" label="Description" {...bindToHookForm} />

        <Input
          type="number"
          name="price"
          defaultValue="1"
          label="Price (lei)"
          min="0"
          step="0.01"
          {...bindToHookForm}
        />
        <Input
          type="number"
          name="stock"
          defaultValue="1"
          label="Amount"
          min="1"
          {...bindToHookForm}
        />
        <Select name="categoryId" label="Category" {...bindToHookForm}>
          <option value="1">Phones</option>
        </Select>
        <Select name="brandId" label="Brand" {...bindToHookForm}>
          <option value="1">Samsung</option>
          <option value="2">Apple</option>
          <option value="3">Huawei</option>
        </Select>

        <Button variant="primary" className="submitBtn">
          {<PlusIcon width={20} />}
          Create post
        </Button>
      </form>
    </>
  );
}
