"use client";
import Container from "@/components/globals/container";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import CouponsCard from "./couponscard";
import { Navigation } from "swiper/modules";
import { useStateManager } from "@/providers/useStateManager";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { GetManagerCoupons } from "@/store/slices/coupon";
import Modal from "@/components/globals/Modal";
import CouponDetails from "./couponDetails";
import Loader from "@/components/globals/Loader";

export default function CouponSlider() {
  const [viewCoupon, setViewCoupon] = useState(null);
  const handleViewcoupon = (value) => setViewCoupon(value);
  const { handleClick } = useStateManager();
  const user = useSelector((state) => state.auth.data);
  const { managerCoupons, isLoading, isSuccess } = useSelector(
    (state) => state.coupon
  );
  const dispatch = useDispatch();
  const fetchManagerCoupon = useCallback(() => {
    if (user?.id) {
      dispatch(GetManagerCoupons(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    fetchManagerCoupon();
  }, [fetchManagerCoupon]);

  return (
    <Loader isLoading={isLoading}>
      <div className="p-10 mt-12 mobile:p-3 mobile:py-6 mobile:mt-4 ">
        <Container>
          <div className="p-8 mobile:p-0 rounded-lg relative coupon-slider-area">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-2xl mobile:text-lg font-semibold">
                  Coupons
                </h4>
              </div>
              <div>
                <button
                  onClick={() => handleClick("/create-coupon")}
                  type="button"
                  className="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                >
                  <FaPlus /> Add Coupons
                </button>
              </div>
            </div>

            {!isLoading && !managerCoupons?.data?.length > 0 ? (
              <h1 className="text-center font-medium text-sm text-gray-600">
                No data Found
              </h1>
            ) : (
              <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={50}
                slidesPerView={4}
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
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
              >
                {managerCoupons?.data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <CouponsCard data={item} handleView={handleViewcoupon} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <Modal
            open={viewCoupon !== null}
            handleOpen={() => handleViewcoupon(null)}
          >
            <div>
              <CouponDetails
                data={viewCoupon}
                isdelete={true}
                handleClose={handleViewcoupon}
                refreshFunc={fetchManagerCoupon}
              />
            </div>
          </Modal>
        </Container>
      </div>
    </Loader>
  );
}
