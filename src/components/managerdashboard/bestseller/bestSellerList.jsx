"use client";
import Container from "@/components/globals/container";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import BestSellerCard from "./bestsellercard";
import { Navigation } from "swiper/modules";
import { useStateManager } from "@/providers/useStateManager";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { GetBestSellerByToken } from "@/store/slices/seller";
import Modal from "@/components/globals/Modal";
import BestSellerDetails from "@/components/globals/dashboard/BestSeller/bestSellerDetails";
import Loader from "@/components/globals/Loader";

export default function BestSellerSlider() {
  const [viewBestSeller, setViewBestSeller] = useState(null);
  const handleViewSellerModal = (value) => setViewBestSeller(value);
  const { handleClick } = useStateManager();
  const dispatch = useDispatch();
  const { bestSellers, isSuccess, isLoading } = useSelector(
    (state) => state.seller
  );
  const user = useSelector((state) => state.auth.data);
  const getBestSellers = useCallback(() => {
    if (user?.id) {
      dispatch(GetBestSellerByToken(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (user?.id) {
      getBestSellers();
    }
  }, [getBestSellers, user]);

  return (
    <Loader isLoading={isLoading}>
      <div className="bg-gray-100 p-10 mt-12 mobile:p-3 mobile:py-6 mobile:mt-4 ">
        <Container>
          <div className="p-8 mobile:p-1 rounded-lg relative best-sestseller-slider">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-2xl mobile:text-lg font-semibold">Best Seller</h4>
              </div>
              <div>
                <button
                  onClick={() => handleClick("/create-bestseller")}
                  type="button"
                  className="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                >
                  <FaPlus /> Add Best Seller
                </button>
              </div>
            </div>
            {isSuccess && bestSellers?.data?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={3}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                breakpoints={{
                  // Mobile devices (320px and up)
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                  },
                  // iPads/Tablets (768px and up)
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  // Desktops (1024px and up)
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                  // Desktops (1200px and up)
                  1200: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                }}
              >
                {bestSellers?.data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <BestSellerCard
                      data={item}
                      handleView={handleViewSellerModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* View Best Seller Modal */}

          <Modal
            size={"sm"}
            handleOpen={() => handleViewSellerModal(null)}
            open={viewBestSeller !== null}
          >
            <BestSellerDetails data={viewBestSeller} />
          </Modal>
        </Container>
      </div>
    </Loader>
  );
}
