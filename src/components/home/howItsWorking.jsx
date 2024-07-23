"use client";

import React from "react";
import Container from "../globals/container";
import Image from 'next/image'

function HowItsWorking() {
  return (
    <div>
      <div className="p-8 md:p-4 lg:p-16 mt-6 relative md:pb-12">
        <Container>
          <h2 className="mb-[2rem] md:mb-[5rem] lg:mb-[5rem] text-center text-3xl font-semibold">
            How it&apos;s working?
          </h2>
          <div className="md:flex lg:flex gap-8 justify-center">
            <div className="w-full lg:w-1/3 md:w-1/3 mb-4">
              <div className="new-shadow rounded-lg p-5 relative">
                <h1 className="w-14 h-14 rounded-full text-center text-5xl leading-[3.5rem] font-extrabold md:absolute md:absolute lg:absolute -top-6 text-outline">
                  01
                </h1>

                <Image
                  src="/assets/shopping.png"
                  width={70}
                  height={70}
                  alt="Picture of the author"
                  className="my-1 md:my-6 lg:my-6 !w-18 !h-18"
                />

                <h3 className="text-xl font-semibold mb-2">
                  Shop with App Name
                </h3>
                <p className="text-gray-500 text-sm">
                  Scan the app or card at the checkout, and always start online
                  shopping at App Name
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 md:w-1/3 mb-4">
              <div className="new-shadow rounded-lg p-5 relative">
                <h1 className="w-14 h-14 rounded-full text-center text-5xl leading-[3.5rem] font-extrabold md:absolute lg:absolute -top-6 text-outline">
                  02
                </h1>

                <Image
                  src="/assets/gift.png"
                  width={70}
                  height={70}
                  alt="Picture of the author"
                  className="my-1 md:my-6 lg:my-6 !w-18 !h-18"
                />

                <h3 className="text-xl font-semibold mb-2">Activate coupons</h3>
                <p className="text-gray-500 text-sm">
                  Thanks to them, you collect °points faster and take advantage
                  of great offers.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/3 md:w-1/3 mb-4">
              <div className="new-shadow rounded-lg p-5 relative">
                <h1 className="w-14 h-14 rounded-full text-center text-5xl leading-[3.5rem] font-extrabold md:absolute lg:absolute -top-6 text-outline">
                  03
                </h1>
                <Image
                   src="/assets/coupon.png"
                  width={70}
                  height={70}
                  alt="Picture of the author"
                  className="my-1 md:my-6 lg:my-6 !w-18 !h-18"
                />

                <h3 className="text-xl font-semibold mb-2">Collect rewards</h3>
                <p className="text-gray-500 text-sm">
                  Exchange the collected °points for prizes, vouchers or further
                  purchases - the decision is yours!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HowItsWorking;
