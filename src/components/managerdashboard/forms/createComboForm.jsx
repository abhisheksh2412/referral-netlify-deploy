import { popup } from "@/_utils/alerts";
import EasySelect from "@/components/globals/EasySelect";
import Loader from "@/components/globals/Loader";
import { config } from "@/config/config";
import { AddCombo } from "@/store/slices/combo";
import { GetProductsByStoreId } from "@/store/slices/products";
import { GetStores } from "@/store/slices/seller";
import { CreateComboValidation } from "@/validators/comboValidation";
import clsx from "clsx";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

export default function CreateComboForm() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { stores } = useSelector((state) => state.seller);
  const { storeProducts, isLoading } = useSelector((state) => state.product);
  const combo = useSelector((state) => state.combo);
  const [selectedStore, setSelectedStore] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectProduct, setSelectedProduct] = useState([]);
  const [BannerImage, setBannerImage] = useState(null);

  const handleSelectedProduct = (productId) => {
    if (!selectProduct.includes(productId)) {
      const products = [...selectProduct, productId];
      setSelectedProduct(products);
      formik.setFieldValue("product_ids", products);
    } else {
      const products = selectProduct.filter((item) => item !== productId);
      setSelectedProduct(products);
      formik.setFieldValue("product_ids", products);
    }
  };

  const handleStoreSelect = (value) => {
    setSelectedStore(value);
    formik.setFieldValue("store_id", value?.value || "");
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setBannerImage(file);
      formik.setFieldValue("banner_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const GetAllstores = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  const GetProductAsPerStore = useCallback(() => {
    if (selectedStore !== null) {
      dispatch(GetProductsByStoreId(selectedStore?.value));
      setSelectedProduct([]);
    }
  }, [dispatch, selectedStore]);

  useEffect(() => {
    GetAllstores();
  }, [GetAllstores]);

  useEffect(() => {
    GetProductAsPerStore();
  }, [GetProductAsPerStore]);

  const options = stores?.data
    ? stores?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }))
    : [];

  const formik = useFormik({
    initialValues: {
      store_id: "",
      product_ids: [],
      banner_image: null,
      title: "",
      description: "",
      points: "",
    },
    validationSchema: CreateComboValidation,
    onSubmit: async (values) => {
      const formdata = new FormData();
      formdata.append("store_id", values.store_id);
      formdata.append("product_ids", values.product_ids);
      formdata.append("title", values.title);
      formdata.append("description", values.description);
      formdata.append("points", values.points);
      formdata.append("banner_image", BannerImage);
      try {
        await dispatch(AddCombo(formdata));

        if (combo.isSuccess) {
          popup({ status: "success", message: "Combo Created Successfully" });
          navigate.back();
        } else {
          // Handle failure case
          popup({ status: "error", message: "Failed to create combo" });
        }
      } catch (error) {
        console.error("Error creating combo:", error);
        popup({ status: "error", message: "Failed to create combo" });
      }
    },
  });

  return (
    <Loader isLoading={combo?.isLoading || isLoading}>
      <form onSubmit={formik.handleSubmit}>
        <EasySelect options={options} handleChange={handleStoreSelect} />
        <div className="grid grid-cols-8 mt-5 gap-3 bg-gray-100 p-4 rounded-lg relative">
          <BarLoader
            loading={isLoading}
            color="#f4739e"
            className="!absolute !w-full left-0 top-0 "
          />
          {storeProducts?.length > 0 ? (
            storeProducts?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectedProduct(item?.id)}
                className={clsx(
                  "col-span-2  p-3 rounded-lg cursor-pointer",
                  selectProduct?.includes(item?.id)
                    ? "bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50"
                    : "bg-gray-300"
                )}
              >
                <div className="">
                  <img
                    className="w-16 h-16 mx-auto p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={config?.IMAGE_URL_PATH + item?.path}
                    alt="product_img"
                  />
                  <p className="text-center text-sm">{item?.name}</p>
                </div>
              </div>
            ))
          ) : (
            <h6 className="col-span-8 justify-self-center text-sm">
              No product found
            </h6>
          )}
        </div>
        {formik.errors.product_ids ? (
          <p className="text-xs text-red-500 p-1 ">
            {formik.errors.product_ids}
          </p>
        ) : (
          ""
        )}
        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Upload Combo Image</p>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {imagePreview && (
              <Image
                src={imagePreview}
                width={100}
                height={100}
                className="!w-full min-h-[20vh]"
              />
            )}
            {!imagePreview && (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {formik.touched.banner_image && formik.errors.banner_image ? (
            <p className="text-xs text-red-500 p-1">
              {formik.errors.banner_image}
            </p>
          ) : null}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Combo Points</p>
          <input
            type="text"
            id="points"
            onChange={formik.handleChange}
            value={formik.values.points}
            name="points"
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Products Points"
            required
          />
          {formik.touched.points && formik.errors.points ? (
            <p>{formik.errors.points}</p>
          ) : null}
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Title</p>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Category Title"
            required
          />
          {formik.touched.title && formik.errors.title ? (
            <p>{formik.errors.title}</p>
          ) : null}
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Description</p>
          <textarea
            id="description"
            rows="4"
            name="description"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          {formik.touched.description && formik.errors.description ? (
            <p>{formik.errors.description}</p>
          ) : null}
        </div>

        <div className="mt-5 w-full">
          <button
            type="submit"
            className="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-3 mb-2"
          >
            Add & Update
          </button>
        </div>
      </form>
    </Loader>
  );
}
