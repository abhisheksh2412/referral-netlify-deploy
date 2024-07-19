"use client";
import React, { useCallback, useEffect } from "react";
import HomeHeader from "../components/home/homeHeader";

import Banner from "../components/home/banner";
import HowItsWorking from "@/components/home/howItsWorking";

import BeforeFooter from "@/components/home/beforeFooter";
import Footer from "@/components/home/footer";
import PopularStore from "@/components/home/PopularStores";

function Home() {
  return (
    <div>
      <HomeHeader />
      <Banner />
      <HowItsWorking />
      <PopularStore />
      <BeforeFooter />
      <Footer />
    </div>
  );
}

export default Home;
