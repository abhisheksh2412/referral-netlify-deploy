import Link from "next/link";
import React from "react";
import Image from "next/image";
import SocialMedia from "../../home/homeHeader/socialMedia";

function DashboardFooter() {
  return (
    <div className="bg-[#0e0a38] pt-10">
      <div className="text-center">
       
        <Image
          src="/assets/footer-logo.png"
          width={500}
          height={500}
          alt="footer logo"
          className="w-40 m-auto"
        />

        <div className="flex justify-center gap-5 my-14 mobile:my-6">
          <Link className="text-white" href="#">
            Home
          </Link>
          <Link className="text-white" href="#">
            Coupon
          </Link>
          <Link className="text-white" href="#">
            Card
          </Link>
          <Link className="text-white" href="#">
            Store
          </Link>
          <Link className="text-white" href="#">
            More
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <SocialMedia />
      </div>

      <div className="text-center text-white mt-8 text-xs	p-4 bg-[#2928345c]">
        <p>Copyright 2024 all rights reserved</p>
      </div>
    </div>
  );
}

export default DashboardFooter;
