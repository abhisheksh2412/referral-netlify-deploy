import { GetPopularStores } from "@/store/slices/seller";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../globals/container";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function PopularStore() {
  const dispatch = useDispatch();
  const { popularStores } = useSelector((state) => state.seller);
  const getAllstores = useCallback(() => {
    dispatch(GetPopularStores());
  }, [dispatch]);
  // Popular stores fetch

  useEffect(() => {
    getAllstores();
  }, [getAllstores]);

  return (
    <div className="bg-gray-100 px-4 	py-8 md:py-16 lg:py-16">
      <Container>
        <h2 className="mb-2 text-center text-3xl font-semibold">
          Popular stores
        </h2>
        <p className="text-center mb-[2rem] md:mb-[5rem] lg:mb-[5rem]">
          300 stores, thousands of °points to collect!
        </p>
        <Swiper
          spaceBetween={50}
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
            // Desktops (1200px and up)
            1200: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {popularStores?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className=" bg-white rounded-lg  relative p-0 rounded-b-lg mb-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                  <Image
                    src={item?.logo}
                    width={250}
                    height={250}
                    alt="Picture of the author"
                    className="!w-32 !h-32 mx-auto object-cover"
                  />
                </div>
                <h3 className="text-center p-4 font-medium">{item?.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
}
