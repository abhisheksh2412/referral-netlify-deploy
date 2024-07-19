"use client";
import Container from "@/components/globals/container";
import { FaPlus } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import ComboProductsCard from "./comboproductscard";
import { Navigation } from "swiper/modules";
import { useStateManager } from "@/providers/useStateManager";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { DeleteCombos, GetUserComboByToken } from "@/store/slices/combo";
import Modal from "@/components/globals/Modal";
import ComboDetails from "./comboDetails";
import Swal from "sweetalert2";
import Loader from "@/components/globals/Loader";

export default function ComboList() {
  const dispatch = useDispatch();
  const { combos, isSuccess, isLoading } = useSelector((state) => state.combo);
  const { handleClick } = useStateManager();
  const [comboDetails, setComboDetails] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const handleComboDetails = (value) => {
    setSelectedCombo(value);
    setComboDetails(!comboDetails);
  };

  const getCombos = useCallback(() => {
    dispatch(GetUserComboByToken());
  }, [dispatch]);

  useEffect(() => {
    getCombos();
  }, [getCombos]);

  return (
    <Loader isLoading={isLoading && !isSuccess}>
      <div className="bg-gray-100 p-10 mt-12 mobile:p-3 mobile:py-6 mobile:mt-4">
        <Container>
          <div className="p-8 mobile:p-2 rounded-lg relative combo-slider">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-2xl mobile:text-lg font-semibold">Combo Products</h4>
              </div>
              <div>
                <button
                  onClick={() => handleClick("/create-combo")}
                  type="button"
                  className="relative inline-flex items-center gap-1 px-6 mobile:px-2 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                >
                  <FaPlus /> Add Combo Products
                </button>
              </div>
            </div>
            {isSuccess && combos?.length === 0 ? (
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
                {combos?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ComboProductsCard
                      data={item}
                      handleClose={handleComboDetails}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <Modal open={comboDetails} handleOpen={handleComboDetails}>
              <ComboDetails data={selectedCombo} />
            </Modal>
          </div>
        </Container>
      </div>
    </Loader>
  );
}
