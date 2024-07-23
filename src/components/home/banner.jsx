import React from "react";
import Container from "../globals/container";
import { FaApple } from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import Image from 'next/image'
import Link from "next/link";

function Banner() {
  return (
    <div>
      <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-6  md:p-8 lg:p-8 md:pb-0 lg:pb-0 pb-0">
        <Container>
          <div className="flex items-center">
            <div className="w-full md:w-3/5	lg:w-1/2">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-[1rem] md:mb-[1rem] lg:mb-[2rem] leading-[2.2rem] md:leading-[2.5rem] lg:leading-[3.5rem] text-center md:text-left lg:text-left mt-6 md:mt-0 lg:mt-0">
                Refferal – A multi partner loyalty program for customers
              </h2>
              <p className="mb-[1rem] md:mb-[1rem] lg:mb-[4rem] text-md md:text-lg lg:text-lg	text-center md:text-left lg:text-left">
                Customers can shop, save, and get rewarded by joining Referral.
                This program enables consumers to collect millions of points
                across online and offline stores with just a single card.{" "}
              </p>

              <h3 className="text-xl md:text-2xl lg:text-2xl text-center md:text-left lg:text-left  font-bold mb-[2rem] mb-[1rem] md:mb-[2rem] lg:mb-[2rem]">Download Now</h3>

              <div className="flex items-center justify-center lg:justify-start md:justify-start gap-5 mt-6 mb-6 md:mb-0 lg:mb-0">
                <Link
                  href="#"
                  className="bg-blush-red inline-block flex items-center justify-center gap-2 py-3 rounded-md text-white px-3 md:px-4 md:px-6"
                >
                  <FaApple className="text-xl md:text-2xl lg:text-4xl" /> <span>App Store</span>
                </Link>

                <Link
                  href="#"
                  className="bg-[#0e0a38] inline-block flex items-center justify-center gap-2 py-3 rounded-md text-white px-3 md:px-4 md:px-6"
                >
                  <DiAndroid className="text-xl md:text-2xl lg:text-4xl" /> <span>Google Play</span>
                </Link>
              </div>
            </div>

            <div className="w-1/2 md:w-2/5 hidden lg:block md:block">
              {/* <img
                className="w-[32rem] mx-auto"
                src="/assets/man.png"
                alt="man"
              /> */}

              <Image
                src="/assets/man.png"
                width={500}
                height={500}
                alt="Picture of the author"
                className="!w-[32rem] mx-auto"
              />

            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Banner;
