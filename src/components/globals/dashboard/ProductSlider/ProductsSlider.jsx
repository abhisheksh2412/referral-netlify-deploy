"use client";
import Container from "@/components/globals/container";
import Modal from "@/components/globals/Modal";
import CreateProductForm from "@/components/managerdashboard/forms/createProduct";
import UpdateProduct from "@/components/managerdashboard/forms/updateProductForm";
import ProductCard from "@/components/managerdashboard/products/productcard";
import ProductDetails from "@/components/managerdashboard/products/ProductDetails";
import { GetAllProduct } from "@/store/slices/products";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../Loader";

export default function ProductsSlider() {
  const { isSuccess, productList, isLoading } = useSelector(
    (state) => state.product
  );

  // edit, create, view  modal handler
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const handleEditProduct = useCallback((status, data = {}) => {
    setEditProduct(status);
    setSelectedProduct(data);
  }, []);
  // To render the modal component as per the status
  const RenderModalComponents = useCallback(
    ({ status, handleModal }) => {
      switch (status) {
        case "edit":
          return (
            <UpdateProduct data={selectedProduct} handleModal={handleModal} />
          );
        case "create":
          return <CreateProductForm handleModal={handleModal} />;
        case "view":
          return <ProductDetails data={selectedProduct} />;
        default:
          return null;
      }
    },
    [selectedProduct]
  );
  const dispatch = useDispatch();
  const getAllData = useCallback(() => {
    dispatch(GetAllProduct());
  }, [dispatch]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);
  return (
    <>
      <Loader isLoading={isLoading && !isSuccess}>
        <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 py-12 mobile:py-6 mobile:p-4">
          {/* Product container  */}
          <Container>
            <div className="bg-white p-8 mobile:p-3 rounded-lg relative top-[60px] mobile:top-[30px]">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-2xl mobile:text-lg font-semibold">
                    Products
                  </h4>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleEditProduct("create")}
                    className="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                  >
                    <FaPlus /> Add Products
                  </button>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/* Product  slider */}
        <Container>
          <div className="py-3 px-6 relative product-slider-area">
            {isSuccess && productList?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={5}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                breakpoints={{
                  // Mobile devices (320px and up)
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  // iPads/Tablets (768px and up)
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  // Desktops (1024px and up)
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                  // Desktops (1200px and up)
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
              >
                {productList?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard data={item} handleModal={handleEditProduct} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          {/* Product Action Modal*/}
          <Modal open={editProduct} handleOpen={handleEditProduct} size={"sm"}>
            <RenderModalComponents
              status={editProduct}
              handleModal={handleEditProduct}
            />
          </Modal>
        </Container>
      </Loader>
    </>
  );
}
