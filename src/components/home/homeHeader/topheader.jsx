import React from "react";
import Container from "../../globals/container";
import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
import Link from "next/link";
import SocialMedia from "./socialMedia";

function TopHeader() {
  return (
    <div>
      <div className="bg-[#0e0a38] p-3">
        <Container>
          <div className="inline md:flex lg:flex justify-between items-center">
            <div className="flex items-center justify-between gap-6">
              <Link href="#" className="flex items-center text-white gap-2">
                <Mail className="w-4 md:w-4 lg:w-5" />
                <span className="text-xs md:text-sm lg:text-sm">support@example.com </span>
              </Link>

              <Link href="#" className="flex items-center justify-end	md:justify-start lg:justify-start text-white gap-2">
                <Phone className="w-4 md:w-4 lg:w-5" />
                <span className="text-xs md:text-sm lg:text-sm"> +98 012345 6789</span>
              </Link>
            </div>

            <div className="flex items-center hidden lg:block md:block">
              <SocialMedia/>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default TopHeader;
