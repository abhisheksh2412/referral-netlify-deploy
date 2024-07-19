"use client";
import { useSelector } from "react-redux";
import Container from "../../container";
import { FaGift } from "react-icons/fa6";

export default function PointsBanner({ points }) {
  return (
    <div className="p-6 md:p-8 lg:p-14 bg-white">
      <Container>
        <div className="md:flex lg:flex items-center p-6 md:p-6 lg:p-10 rounded-lg bg-[#f4739e] bg-[url('/assets/bg-1.png')] bg-no-repeat; bg-cover">
          <div className="md:w-4/5	lg:w-4/5	">
            <h2 className="mb-2 text-2xl md:text-2xl lg:text-3xl font-semibold text-white text-center md:text-left lg:text-left">
              My Rewards Points
            </h2>
          </div>
          <div className="md:w-2/5 lg:w-1/5 mt-5 md:mt-0 lg:mt-0">
            <button className="relative flex flex-nowrap  text-nowrap w-fit items-center gap-1 px-3 py-2.5 text-sm font-medium text-center text-white bg-[#0e0a38] rounded-lg justify-center    md:w-full lg:w-full mx-auto">
              <FaGift />
              Rewards Points :<strong>{points}</strong>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
