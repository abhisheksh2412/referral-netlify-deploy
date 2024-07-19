"use client";

import Container from "@/components/globals/container";
import Modal from "@/components/globals/Modal";
import CategoryCard from "@/components/managerdashboard/category/categorycard";
import CategoryDetails from "@/components/managerdashboard/category/categoryDetails";
import { GetAllCategories } from "@/store/slices/category";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../Loader";

export default function CategorySlider() {
  const dispatch = useDispatch();
  const { categoryList, isSuccess, isLoading } = useSelector(
    (state) => state.category
  );
  // category modal handler
  const [categoryModal, setCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const handleCategoryModal = (data) => {
    setSelectedCategory(data);
    setCategoryModal(!categoryModal);
  };

  const getAllData = useCallback(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);

  // to get all the products, stores, categories
  useEffect(() => {
    getAllData();
  }, [getAllData]);
  return (
    <Loader isLoading={isLoading}>
      <div className="p-10 mt-12 mobile:p-3 mobile:py-6 mobile:mt-4">
        <Container>
          <div className="p-8 mobile:p-0 rounded-lg relative category-slider-area">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-2xl mobile:text-lg font-semibold">Categories</h4>
              </div>
              <div></div>
            </div>
            {isSuccess && categoryList?.length === 0 ? (
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
                {categoryList?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => handleCategoryModal(item)}
                      className="cursor-pointer"
                    >
                      <CategoryCard data={item} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {/* Category Detials Modal */}
            <Modal open={categoryModal} handleOpen={handleCategoryModal}>
              <CategoryDetails data={selectedCategory} />
            </Modal>
          </div>
        </Container>
      </div>
    </Loader>
  );
}
