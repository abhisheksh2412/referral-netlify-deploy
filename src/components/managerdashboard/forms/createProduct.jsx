import { popup } from "@/_utils/alerts";
import EasySelect from "@/components/globals/EasySelect";
import GlobalInput from "@/components/globals/globalInput";
import Loader from "@/components/globals/Loader";
import UseSampleImage from "@/components/globals/useSampleImage";
import { CreateProduct, GetAllProduct } from "@/store/slices/products";
import { GetStores } from "@/store/slices/seller";
import { ProductCreateValidationsSchema } from "@/validators/productValidations";
import { useFormik } from "formik";
import { Info, Minus, Pen, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

export default function CreateProductForm({ handleModal }) {
  const [imagePreview, setImagePreview] = useState(
    "/assets/image_default.webp"
  );
  const { isLoading, isSuccess } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.seller);
  const formik = useFormik({
    initialValues: {
      name: "",
      points: 1,
      quantity: 1,
      product_image: null,
      description: "",
      weight: "",
      store_id: "",
    },
    validationSchema: ProductCreateValidationsSchema,
    onSubmit: async (values, { resetForm }) => {
      const formdata = new FormData();
      formdata.append("name", values.name);
      formdata.append("points", values.points);
      formdata.append("quantity", values.quantity);
      formdata.append("weight", values.weight);
      formdata.append("store_id", values.store_id);
      formdata.append("description", values.description);
      if (values.product_image) {
        formdata.append("product_image", values.product_image);
      }
      await dispatch(CreateProduct(formdata));
      dispatch(GetAllProduct());
      if (await isSuccess) {
        popup({ status: "success", message: "Product Added successfully" });
        handleModal(null, {});
        resetForm();
      }
    },
  });

  const handleIncrease = (e) => {
    e.preventDefault();
    formik.setFieldValue("quantity", formik.values.quantity + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    if (formik.values.quantity > 0) {
      formik.setFieldValue("quantity", formik.values.quantity - 1);
    }
  };

  const handleStoreId = (value) => {
    formik.setFieldValue("store_id", value?.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("product_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const GetStoresList = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  useEffect(() => {
    GetStoresList();
  }, [GetStoresList]);

  const options = stores?.data
    ? stores?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }))
    : [];
  return (
    <>
      <div className="bg-gradient-to-r from-blush-red to-pink-200 rounded-t-md text-white text-center font-semibold">
        <h6 className="text-base p-4">Add Product</h6>
      </div>
      <Loader isLoading={isLoading}>
        <div className="w-full max-h-[80vh] flex flex-col items-center overflow-auto">
          {/*  Product image Upload */}
          <span className="w-full flex flex-col items-center justify-between ">
            <div className="relative w-40 h-40">
           

              <Image
                src={imagePreview}
                width={500}
                height={500}
                alt="store Image"
                className="w-40 h-40 rounded-full p-2 shadow-md object-cover object-center"
              />

              <button
                type="button"
                className="p-2 bg-gray-200 rounded-full absolute right-2 m-1  top-2"
              >
                <Pen
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    document.getElementById("upload_image").click();
                  }}
                  size={15}
                />
              </button>
            </div>
          </span>
          <UseSampleImage popper={false} />
          {formik.touched.product_image && formik.errors.product_image ? (
            <p className="text-xs text-red-500 p-1">
              {formik.errors.product_image}
            </p>
          ) : null}
          <form onSubmit={formik.handleSubmit}>
            <input
              type="file"
              id="upload_image"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="p-4 grid lg:grid-cols-2 mobile:inline-block mobile:p-3 gap-2">
              <span className="mobile:mb-3 mobile:inline-block mobile:w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Product Name
                </label>
                <GlobalInput
                  type="text"
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  placeholder="Product Name"
                  parentClassName="border border-2 border-gray-300 p-2 px-3 flex gap-2 rounded-md"
                  inputClassName="outline-none text-gray-800 text-sm"
                  error={
                    formik.touched.name && formik.errors.name
                      ? formik.errors.name
                      : null
                  }
                />
              </span>

              <span className="mobile:mb-3 mobile:inline-block mobile:w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Product Points
                </label>
                <GlobalInput
                  type="text"
                  name="points"
                  value={formik.values.points}
                  onChange={formik.handleChange}
                  placeholder="Product Points"
                  parentClassName="border border-2 border-gray-300 p-2 px-3 flex gap-2 rounded-md"
                  inputClassName="outline-none text-gray-800 text-sm"
                  error={
                    formik.touched.points && formik.errors.points
                      ? formik.errors.points
                      : null
                  }
                />
              </span>

              <span className="mobile:mb-3 mobile:inline-block mobile:w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Product Quantitiy
                </label>
                <GlobalInput
                  type="number"
                  leftIcon={
                    <button
                      onClick={handleDecrease}
                      className="p-1.5 px-4 bg-red-100 cursor-pointer hover:bg-red-200 transition-colors rounded-tl-sm rounded-bl-sm"
                    >
                      <Minus />
                    </button>
                  }
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  parentClassName="border border-2 border-gray-300 flex gap-2 rounded-md overflow-hidden"
                  inputClassName="modify-inc-dec-btn outline-none text-gray-800 text-sm text-center w-full"
                  rightIcon={
                    <button
                      onClick={handleIncrease}
                      className="p-1.5 px-4 bg-green-100 cursor-pointer hover:bg-green-200 transition-colors rounded-tr-sm rounded-br-sm"
                    >
                      <Plus />
                    </button>
                  }
                  error={
                    formik.touched.quantity && formik.errors.quantity
                      ? formik.errors.quantity
                      : null
                  }
                />
              </span>

              <span className="mobile:mb-3 mobile:inline-block mobile:w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Product Weight
                </label>
                <GlobalInput
                  type="text"
                  name="weight"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  placeholder="Product Points"
                  parentClassName="border border-2 border-gray-300 p-2 px-3 flex gap-2 rounded-md"
                  inputClassName="outline-none text-gray-800 text-sm"
                  error={
                    formik.touched.weight && formik.errors.weight
                      ? formik.errors.weight
                      : null
                  }
                />
              </span>
              {/* discription  */}
              <span className="flex flex-col col-span-2 gap-1 w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Description
                </label>
                <textarea
                  rows={5}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  name="description"
                  className="outline-none  text-gray-800 text-sm border-gray-300 border-2 rounded-md p-2"
                  placeholder="Description"
                ></textarea>

                {formik.touched.description && formik.errors.description ? (
                  <p className="text-xs text-red-500 p-1">
                    {formik.errors.description}
                  </p>
                ) : null}
              </span>
              {/* select store */}
              <span className="col-span-2 w-full">
                <label
                  htmlFor="product_name"
                  className="text-gray-800 text-sm font-semibold"
                >
                  Store
                </label>
                <EasySelect options={options} handleChange={handleStoreId} />
                {formik.touched.store_id && formik.errors.store_id ? (
                  <p className="text-xs text-red-500 p-1">
                    {formik.errors.store_id}
                  </p>
                ) : null}
              </span>

              <button className="w-full text-sm p-3 rounded-md text-white bg-blush-red col-span-2 mobile:my-3 ">
                Add
              </button>
            </div>
          </form>
        </div>
      </Loader>
    </>
  );
}
