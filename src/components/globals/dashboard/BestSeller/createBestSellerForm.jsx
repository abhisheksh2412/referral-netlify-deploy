import { useCallback, useEffect, useMemo, useState } from "react";
import EasySelect from "../../EasySelect";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProduct } from "@/store/slices/products";
import Loader from "../../Loader";
import { useFormik } from "formik";
import { CreateBestSellerValidations } from "@/validators/bestSellerValidations";
import { AddBestSeller } from "@/store/slices/seller";
import { popup } from "@/_utils/alerts";
import { useRouter } from "next/navigation";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import UseSampleImage from "../../useSampleImage";

export default function CreateBestSellerForm() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const seller = useSelector((state) => state.seller);
  const { productList, isLoading } = useSelector((state) => state.product);
  const getProductlist = useCallback(() => {
    dispatch(GetAllProduct());
  }, [dispatch]);

  useEffect(() => {
    getProductlist();
  }, [getProductlist]);

  const formik = useFormik({
    initialValues: {
      product_id: "",
      banner_image: "",
      description: "",
    },
    validationSchema: CreateBestSellerValidations,
    onSubmit: async (values) => {
      const formdata = new FormData();
      for (const key of Object.keys(values)) {
        formdata.append(key, values[key]);
      }
      await dispatch(AddBestSeller(formdata));
      if (!seller.isLoading && seller.isSuccess) {
        popup({
          status: "success",
          message: "create best seller successfully ",
        });
        navigate.back();
      }
    },
  });

  const handleFileChange = (event) => {
    const selectedFile = event.currentTarget.files[0];
    formik.setFieldValue("banner_image", selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setSelectedImage(null);
    }
  };

  const productListOptions = useMemo(() => {
    return productList?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }, [productList]);

  return (
    <Loader isLoading={isLoading || seller?.isLoading}>
      <div className="p-12 new-shadow bg-white w-3/5 mobile:w-full sm:w-8/12 md:w-9/12 sm:p-6 mobile:p-3 mx-auto rounded-lg">
        <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
          Best Seller
        </h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-6 w-full">
            <p className="text-base font-semibold mb-2">Select Product</p>
            <EasySelect
              options={productListOptions}
              handleChange={(value) =>
                formik.setFieldValue("product_id", value?.value)
              }
              onBlur={() => formik.setFieldTouched("product_id", true)}
            />
            {formik.touched.product_id && formik.errors.product_id ? (
              <p className="text-red-500 text-xs">{formik.errors.product_id}</p>
            ) : null}
          </div>

          <div className="mt-6 w-full">
            <p className="text-base font-semibold mb-2">
              Upload Best Seller Image
            </p>
            <UseSampleImage
              popper={false}
              buttonClass="!w-fit"
              imageUrl="/assets/bestsellerdemo.png"
            />
            <label
              htmlFor="banner_image"
              className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {selectedImage && (
                  <Image
                    src={selectedImage}
                    width={100}
                    height={100}
                    alt="Uploaded_image"
                    className="!w-full !h-[20vh]"
                  />
                )}
                {!selectedImage && (
                  <>
                    <CloudUpload className="text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      JPG, JPEG, or PNG (MIN 200x200px ,Max. 500x500px , 2MB)
                    </p>
                  </>
                )}
              </div>
              <input
                id="banner_image"
                name="banner_image"
                type="file"
                className="hidden"
                onChange={(event) => handleFileChange(event)}
              />
            </label>
            {formik.touched.banner_image && formik.errors.banner_image ? (
              <p className="text-red-500 text-xs">
                {formik.errors.banner_image}
              </p>
            ) : null}
          </div>

          <div className="mt-5 w-full">
            <p className="text-base font-semibold mb-2">Description</p>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <p className="text-red-500 text-xs">
                {formik.errors.description}
              </p>
            ) : null}
          </div>

          <div className="mt-5 w-full">
            <button
              type="submit"
              className="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
            >
              Add Best Seller
            </button>
          </div>
        </form>
      </div>
    </Loader>
  );
}
