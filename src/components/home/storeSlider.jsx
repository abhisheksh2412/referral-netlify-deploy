import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Container from "../globals/container";
import { config } from "@/config/config";
import Modal from "../globals/Modal";
import moment from "moment";
import { useSelector } from "react-redux";

function StoreSlider({ stores, details = false }) {

  return (
    <div className="bg-gray-100	py-16">
      <Container>
        <h2 className="mb-2 text-center text-3xl font-semibold">
          Popular stores
        </h2>
        <p className="text-center mb-[5rem]">
          300 stores, thousands of °points to collect!
        </p>

      </Container>
    </div>
  );
}

export default StoreSlider;
