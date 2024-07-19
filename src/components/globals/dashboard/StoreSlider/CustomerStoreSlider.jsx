"use client";
import Container from "@/components/globals/container";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../../Modal";
import { config } from "@/config/config";
import StoreDetails from "../StoreDetials";
import { Navigation } from "swiper/modules";
import { GetFavoriteStores } from "@/store/slices/customer";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function CustomerStoresSlider({ details = true }) {
  const [selectedData, setSelectedData] = useState(null);
  const [detailsModal, setDetialsModal] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);
  const params = useSearchParams();

  const handleViewModal = (data) => {
    setSelectedStore(data?.id);
    setDetialsModal(!detailsModal);
    setSelectedData(data);
  };

  const dispatch = useDispatch();
  const navigate = useRouter();
  const customer = useSelector((state) => state.customer);
  const user = useSelector((state) => state.auth.data);

  const getAllFavStores = useCallback(() => {
    if (user?.id) {
      dispatch(GetFavoriteStores(user.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    getAllFavStores();
  }, [getAllFavStores]);

  const updateStore = useCallback(
    (selectedStore) => {
      if (customer?.favouriteStores) {
        if (selectedStore === null) {
          const storeId = customer.favouriteStores[0]?.id;
          if (storeId) {
            const newUrl = new URL(window.location);
            newUrl.searchParams.set("store_id", storeId);
            localStorage.setItem("store_id", storeId);
            navigate.replace(newUrl.toString(), {
              shallow: false,
              scroll: false,
            });
          }
        } else {
          const newUrl = new URL(window.location);
          newUrl.searchParams.set("store_id", selectedStore);
          localStorage.setItem("store_id", selectedStore);
          navigate.replace(newUrl.toString(), {
            shallow: false,
            scroll: false,
          });
        }
      }
    },
    [customer?.favouriteStores, navigate]
  );
  useEffect(() => {
    updateStore(selectedStore);
  }, [updateStore]);

  return (
    <Loader isLoading={customer?.isLoading}>
      <div className=" mt-12">
        <Container>
          <div className="p-0 rounded-lg relative slide-d-cstmr">
            {customer?.isSuccess && customer?.favouriteStores?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={5}
                navigation={true}
                modules={[Navigation]}
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
                {customer?.favouriteStores?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => handleViewModal(item)}
                      className={clsx(
                        " bg-white rounded-lg  border-2 border-transparent relative p-0 rounded-b-lg mb-4 cursor-pointer shadow-md transition-shadow",
                        parseInt(params.get("store_id")) ===
                          parseInt(item?.id) && "!border-2 !border-blush-red"
                      )}
                    >
                      <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                        <img
                          class="w-32 h-32 mx-auto object-cover"
                          src={config.IMAGE_URL_PATH + item?.logo}
                          alt="StoreImage"
                        />
                      </div>
                      <h3 className="text-center p-4 font-medium">
                        {item?.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <Modal
              open={details && detailsModal}
              handleOpen={handleViewModal}
              size={"sm"}
            >
              <StoreDetails selectedData={selectedData} />
            </Modal>
          </div>
        </Container>
      </div>
    </Loader>
  );
}
