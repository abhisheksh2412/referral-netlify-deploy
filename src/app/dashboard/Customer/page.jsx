"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import { FaPlus } from "react-icons/fa6";
import { MdGridView } from "react-icons/md";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomerStoresSlider from "@/components/globals/dashboard/StoreSlider/CustomerStoreSlider";
import ProductCard from "@/components/managerdashboard/products/productcard";
import ComboProductsCard from "@/components/managerdashboard/comboproducts/comboproductscard";
import ProductDetails from "@/components/managerdashboard/products/ProductDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "@/components/globals/Modal";
import { Navigation } from "swiper/modules";
import ComboDetails from "@/components/managerdashboard/comboproducts/comboDetails";
import CouponsCard from "@/components/managerdashboard/coupons/couponscard";
import CouponDetails from "@/components/managerdashboard/coupons/couponDetails";
import BestSellerCard from "@/components/managerdashboard/bestseller/bestsellercard";
import BestSellerDetails from "@/components/globals/dashboard/BestSeller/bestSellerDetails";
import ExtraPoints from "@/components/customerdashboard/extraPoints";
import { AiFillCheckCircle } from "react-icons/ai";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import MmenuShopCafeCard from "@/components/managerdashboard/menushopcafe/menushopcafecard";
import MenuShopCafeDetails from "@/components/managerdashboard/menushopcafe/menuShopCafeDetails";
import PointsBanner from "@/components/globals/dashboard/customer/PointsBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  GetCustomerDashData,
  GetFavoriteStores,
  GetFavouriteProducts,
} from "@/store/slices/customer";
import { useSearchParams } from "next/navigation";
import { config } from "@/config/config";
import withAuth from "@/hoc/withAuth";

function CustomerDashboard() {
  const [productDetailsModal, setProductDetailsModal] = useState(null);

  const handleProductDetailsModal = (status, value) =>
    setProductDetailsModal(value);

  const [viewFavoriteModal, setViewFavoriteModal] = useState(null);
  const handleViewFavoriteModal = (status, value) =>
    setViewFavoriteModal(value);
  const [comboDetails, setComboDetails] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const handleComboDetails = (value) => {
    setSelectedCombo(value);
    setComboDetails(!comboDetails);
  };

  const [viewCoupon, setViewCoupon] = useState(null);
  const handleViewcoupon = (value) => setViewCoupon(value);

  const [viewBestSeller, setViewBestSeller] = useState(null);
  const handleViewSellerModal = (value) => setViewBestSeller(value);

  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(null);
  const handleViewExtraPointsModal = (value) => setViewExtraPointsModal(value);

  const [menuCafeViewModal, setMenuCafeViewModal] = useState(null);
  const handleMenuCafeViewModal = (value) => {
    setMenuCafeViewModal(value);
  };

  // Get FavStores
  const dispatch = useDispatch();
  const params = useSearchParams();
  const storeId = params.get("store_id");
  const customer = useSelector((state) => state.customer);
  const user = useSelector((state) => state.auth.data);

  const getAllFavStores = useCallback(() => {
    if (user?.id) {
      dispatch(GetFavoriteStores(user.id));
      dispatch(GetFavouriteProducts(user?.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    getAllFavStores();
  }, [getAllFavStores]);

  // Get all customer data

  const CustomersAllData = useCallback(() => {
    const id = params.get("store_id");
    dispatch(GetCustomerDashData(id));
  }, [dispatch, params]);

  useEffect(() => {
    CustomersAllData();
  }, [CustomersAllData]);

  return (
    <div>
      <TopHeader />
      <CustomerHeader />
      <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 py-12 pb-0">
        <Container>
          <div className="mobile:px-4 px-16 mx-auto mobile:w-11/12 tab:w-full">
            <div className="flex items-center justify-between">
              <div className="mobile:w-full w-1/2 mobile:pb-10">
                <h2 className="mobile:text-2xl tab:text-4xl text-5xl font-bold mobile:text-center mobile:mb-[1rem] mb-[2rem] leading-[3.5rem]">
                  We bring solutions to make life easier
                </h2>
                <p className="mobile:text-base text-lg mobile:text-center">
                  We are a creative company that focuses on long term
                  relationships with customers.
                </p>
              </div>

              <div className="mobile:hidden w-1/2">
                <Image
                  src="/assets/reff.png"
                  width={550}
                  height={550}
                  alt="Picture of the author"
                />
              </div>
            </div>
          </div>
        </Container>
        <div className="overflow-hidden relative top-1">
          <div className="divider text-[#fefefe] mx-[-0.5rem]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 60">
              <path
                fill="currentColor"
                d="M0,0V60H1440V0A5771,5771,0,0,1,0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-12 mobile:p-6 tab:p-0">
        <Container>
          <div className="mt-12 flex mobile:inline items-center justify-between mb-4">
            <h2 className="mb-0 mobile:mb-3 text-center text-2xl mobile:text-xl font-semibold">
              Popular Stores
            </h2>
            <div className="flex items-center mobile:justify-between gap-3">
              <Link
                class="relative inline-flex justify-center items-center gap-1 px-6 mobile:px-2 whitespace-nowrap	 py-2.5 text-sm font-medium text-center text-white bg-[#0e0a38] rounded-lg mobile:w-1/2"
                href="/dashboard/Customer/viewStore"
              >
                <MdGridView />
                View All{" "}
              </Link>
              <Link
                class="relative inline-flex justify-center items-center gap-1 px-6 mobile:px-2 whitespace-nowrap	 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg mobile:w-1/2"
                href="/dashboard/Customer/addStore"
              >
                <FaPlus />
                Add Favorite Stores
              </Link>
            </div>
          </div>
          <CustomerStoresSlider details={false} />
        </Container>
      </div>

      <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="my-12 mobile:my-6 flex items-center justify-between ">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Popular Products
            </h2>
            <div className="flex items-center gap-3">
              <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/customerProducts"
              >
                <MdGridView />
                View All
              </Link>
            </div>
          </div>
          <div className="customer-pro-slider relative">
            {customer?.data?.products?.length === 0 ? (
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
                {customer?.data?.products?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard
                      data={item}
                      isActionAllow={false}
                      handleModal={handleProductDetailsModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <Modal
            open={productDetailsModal !== null}
            handleOpen={() => handleProductDetailsModal("close", null)}
          >
            <ProductDetails data={productDetailsModal} isSharable={false} />
          </Modal>
        </Container>
      </div>

      {/* ============================Points banner ============================ */}
      <PointsBanner points={customer?.data?.totalEarnPoints} />

      <div className="py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="my-12 mobile:my-6 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Grab a Set
            </h2>
            <div className="flex items-center gap-3">
              <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/comboProducts"
              >
                <MdGridView />
                View All
              </Link>
            </div>
          </div>
          <div className="cstmr-combo-prdct-slider relative">
            {customer?.data?.partnerCombos?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
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
                {customer?.data?.partnerCombos?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ComboProductsCard
                      data={item}
                      isdelete={false}
                      handleClose={handleComboDetails}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <Modal open={comboDetails} handleOpen={handleComboDetails}>
            <ComboDetails data={selectedCombo} />
          </Modal>
        </Container>
      </div>

      <div className="py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="my-12 mobile:my-6 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Coupon
            </h2>
            <div className="flex items-center gap-3">
              <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href={`/dashboard/Customer/customerCoupon?store_id=${storeId}`}
              >
                <MdGridView />
                View All
              </Link>
            </div>
          </div>
          <div className="relative coupon-slider-area customer-couponarea">
            {customer?.data?.coupons?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={4}
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
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
              >
                {customer?.data?.coupons?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <CouponsCard
                      data={item}
                      handleView={handleViewcoupon}
                      isdelete={false}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
          <Modal
            size={"xs"}
            open={viewCoupon !== null}
            handleOpen={() => handleViewcoupon(null)}
          >
            <div>
              <CouponDetails data={viewCoupon} />
            </div>
          </Modal>
        </Container>
      </div>

      <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="my-12 tab:my-6 mobile:my-6 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Favorite Products
            </h2>
            <div className="flex items-center gap-3">
              <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/customerFavoriteProducts"
              >
                <MdGridView />
                View All
              </Link>
            </div>
          </div>
          <div className="customer-pro-slider relative">
            {customer?.favouritesProducts?.length === 0 ? (
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
                {customer?.favouritesProducts?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard
                      data={item}
                      isActionAllow={false}
                      handleModal={handleViewFavoriteModal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>

          <Modal
            open={viewFavoriteModal !== null}
            handleOpen={() => handleViewFavoriteModal("close", null)}
          >
            <ProductDetails data={viewFavoriteModal} />
          </Modal>
        </Container>
      </div>

      <div className=" py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Best Seller
            </h2>
            <div className="flex items-center gap-3">
              <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/custmerBestSeller"
              >
                <MdGridView />
                View All
              </Link>
            </div>
          </div>
          <div className="relative best-seller-customer">
            {customer?.data?.bestOffers?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation={true}
                modules={[Navigation]}
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
                {customer?.data?.bestOffers?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <BestSellerCard
                      data={item}
                      isActionAllow={false}
                      handleView={handleViewSellerModal}
                      ClassName="!bg-gray-100"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            <Modal
              size={"sm"}
              handleOpen={() => handleViewSellerModal(null)}
              open={viewBestSeller !== null}
            >
              <BestSellerDetails data={viewBestSeller} />
            </Modal>
          </div>
        </Container>
      </div>

      <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="my-12 mobile:my-6 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Extra Points
            </h2>
            <div className="flex items-center gap-3">
              {/* <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/extraPoints"
              >
                <MdGridView />
                View All
              </Link> */}
            </div>
          </div>
          <div className="extra-points relative">
            {customer?.data?.extra_points_and_products_list?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation={true}
                modules={[Navigation]}
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
                {customer?.data?.extra_points_and_products_list?.map(
                  (item, index) => (
                    <SwiperSlide key={index}>
                      <div onClick={() => handleViewExtraPointsModal(item)}>
                        <ExtraPoints data={item} />
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            )}
          </div>

          <Modal
            size={"sm"}
            open={viewExtraPointsModal !== null}
            handleOpen={() => handleViewExtraPointsModal(null)}
          >
            <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md">
              <h1>Extra Points Details</h1>
            </div>
            <div className="p-4 relative">
              <div className="">
                <div className=" p-1 shadow rounded-full w-32 h-32 flex items-center justify-center mx-auto">
                  <Image
                    src={
                      config?.IMAGE_URL_PATH +
                      viewExtraPointsModal?.product_image
                    }
                    width={150}
                    height={150}
                    alt="Picture of the author"
                    className="rounded-full w-28 h-28"
                  />
                </div>

                <div>
                  <h3 className="text-center font-semibold text-lg mb-2 mt-2 text-black">
                    {viewExtraPointsModal?.product_name}
                  </h3>
                  <div className="flex justify-center">
                    <h5 class="absolute top-0 right-0 m-5 bg-blush-red text-white text-sm font-medium me-2 px-3 py-1.5 rounded-full dark:bg-pink-900 dark:text-pink-300 inline-flex items-center gap-1">
                      <AiFillCheckCircle className="w-6 h-6" />
                      {viewExtraPointsModal?.earn_point} Points
                    </h5>
                  </div>
                </div>

                {/* <div className="flex justify-center	gap-8 my-2">
                  <h3 className="font-medium text-md text-black">
                    <b className="text-blush-red">Qty :</b> 00
                  </h3>
                  <h3 className="font-medium text-md text-black">
                    <b className="text-blush-red">g</b> : 00
                  </h3>
                </div> */}
              </div>
              <p className="text-gray-500 text-base mt-2 font-normal text-center">
                {viewExtraPointsModal?.store_name}
              </p>
            </div>
          </Modal>
        </Container>
      </div>

      <div className="py-16 mobile:py-6 mobile:p-4 ">
        <Container>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="mb-0 text-center text-2xl mobile:text-lg font-semibold">
              Menu Shop Cafe
            </h2>
            <div className="flex items-center gap-3">
              {/* <Link
                class="relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
                href="/dashboard/Customer/menuShopCafe"
              >
                <MdGridView />
                View All
              </Link> */}
            </div>
          </div>
          <div className="relative shop-cafe-slider">
            {customer?.data?.menu_shopcafe_list?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-500">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={4}
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
                {customer?.data?.menu_shopcafe_list?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <MmenuShopCafeCard
                      data={item}
                      isActionAllow={false}
                      handleView={handleMenuCafeViewModal}
                    />
                  </SwiperSlide>
                ))}
                <Modal
                  size={"sm"}
                  handleOpen={() => handleMenuCafeViewModal(null)}
                  open={menuCafeViewModal !== null}
                >
                  <MenuShopCafeDetails data={menuCafeViewModal} />
                </Modal>
              </Swiper>
            )}
          </div>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(CustomerDashboard);
