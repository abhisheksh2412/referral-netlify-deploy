"use client";
import Container from "@/components/globals/container";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import MmenuShopCafeCard from "./menushopcafecard";
import { Navigation } from "swiper/modules";
import { useStateManager } from "@/providers/useStateManager";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { GetMenuCafeList } from "@/store/slices/menuShopCafe";
import Modal from "@/components/globals/Modal";
import CreateMenuCafeForm from "@/components/globals/dashboard/MenuCafe/createMenuCafeForm";
import MenuShopCafeDetails from "./menuShopCafeDetails";
import Loader from "@/components/globals/Loader";

export default function MenuShopCafeSlider() {
  const [selectedViewData, setSelectedViewData] = useState(null);
  const handleViewModal = (value) => setSelectedViewData(value);
  const [updateMenuShopCafe, setUpdateMenuShopCafe] = useState(null);
  const handleUpdateShopMenuCafe = (data) => setUpdateMenuShopCafe(data);
  const { handleClick } = useStateManager();
  const dispatch = useDispatch();
  const { menuCafeList, isSuccess, isLoading } = useSelector(
    (state) => state.menu
  );

  const fetChMenuCafeList = useCallback(() => {
    dispatch(GetMenuCafeList());
  }, [dispatch]);

  useEffect(() => {
    fetChMenuCafeList();
  }, [fetChMenuCafeList]);

  return (
    <Loader isLoading={isLoading}>
      <div className="p-10 mt-12 mobile:p-3 mobile:py-6 mobile:mt-4 ">
        <Container>
          <div className="p-8 mobile:p-0 rounded-lg relative shop-cafe-slider">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-2xl mobile:text-lg font-semibold">Menu Shop Cafe</h4>
              </div>
              <div>
                <button
                  onClick={() => handleClick("/create-menu-shop-cafe")}
                  type="button"
                  className="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                >
                  <FaPlus /> Add Cafe
                </button>
              </div>
            </div>
            {isSuccess && menuCafeList?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
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
                    slidesPerView: 2,
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
                {menuCafeList?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <MmenuShopCafeCard
                      data={item}
                      handleEdit={handleUpdateShopMenuCafe}
                      handleView={handleViewModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          {/* Edit Menu cafe Modal */}
          <Modal
            handleOpen={() => handleUpdateShopMenuCafe(null)}
            open={updateMenuShopCafe !== null}
          >
            <div>
              <div className="text-base bg-gradient-to-r from-blush-red to-pink-200 p-3 text-center rounded-t-md font-semibold text-white">
                <h1>Update Shop Menu Cafe</h1>
              </div>
              <div className="px-5 py-2 max-h-[85vh] overflow-y-auto">
                <CreateMenuCafeForm
                  menuPlacement="top"
                  edit={true}
                  editData={updateMenuShopCafe}
                  handleModal={handleUpdateShopMenuCafe}
                />
              </div>
            </div>
          </Modal>

          {/* View Menu cafe Modal */}
          <Modal
            size={"sm"}
            open={selectedViewData !== null}
            handleOpen={() => handleViewModal(null)}
          >
            <MenuShopCafeDetails data={selectedViewData} />
          </Modal>
        </Container>
      </div>
    </Loader>
  );
}
