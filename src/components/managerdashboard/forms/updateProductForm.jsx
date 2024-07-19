import { popup } from "@/_utils/alerts";
import EasySelect from "@/components/globals/EasySelect";
import GlobalInput from "@/components/globals/globalInput";
import { config } from "@/config/config";
import { GetAllProduct, UpdateProductApi } from "@/store/slices/products";
import { GetStores } from "@/store/slices/seller";
import { useFormik } from "formik";
import { Minus, Pen, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UpdateProduct({ data, handleModal }) {
  const [imagePreview, setImagePreview] = useState(
    config.IMAGE_URL_PATH + data?.path
  );
  const { isLoading, isSuccess } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.seller);
  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      points: data?.points || 1,
      quantity: data?.quantity || 1,
      product_image: null,
      description: data.description || "",
      weight: data?.weight || "",
      store_id: data?.store_id || "",
    },
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

      await dispatch(UpdateProductApi(data?.id, formdata));
      if (await isSuccess) {
        handleModal(null, {});
        await dispatch(GetAllProduct());
        popup({ status: "success", message: "updated Product successfully" });
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
        <h6 className="text-base p-3">Update Product</h6>
      </div>
      <div className="w-full max-h-[80vh] flex flex-col items-center overflow-auto">
        <div className="relative w-40 h-40">
          <img
            src={imagePreview}
            alt="store Image"
            className="w-40 h-40 rounded-full p-2 shadow-md"
          />
          <button
            type="button"
            className="p-2 bg-gray-200 rounded-full absolute right-2 m-1  top-2"
          >
            <Pen
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("upload_image").click();
              }}
              size={15}
            />
          </button>
        </div>
        {/*  Product image Upload */}
        <form onSubmit={formik.handleSubmit}>
          <input
            type="file"
            id="upload_image"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="p-4 grid grid-cols-2 gap-2">
            <span>
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
              />
            </span>
            <span>
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
              />
            </span>
            <span>
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
              />
            </span>
            <span>
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
              />
            </span>
            {/* discription  */}
            <span className="flex flex-col col-span-2">
              <label
                htmlFor="product_name"
                className="text-gray-800 text-sm font-semibold"
              >
                Description
              </label>
              <textarea
                rows={5}
                value={formik.values.description}
                name="description"
                onChange={formik.handleChange}
                className="outline-none  text-gray-800 text-sm border-gray-300 border-2 rounded-md p-2"
                placeholder="Description"
              ></textarea>
            </span>
            {/* select store */}
            <span className="col-span-2">
              <label
                htmlFor="product_name"
                className="text-gray-800 text-sm font-semibold"
              >
                Store
              </label>
              <EasySelect
                defaultValue={options.find(
                  (item) => item?.value === formik.values.store_id
                )}
                options={options}
                handleChange={handleStoreId}
              />
            </span>

            <button className="w-full text-sm p-2 rounded-md text-white bg-blush-red col-span-2">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
