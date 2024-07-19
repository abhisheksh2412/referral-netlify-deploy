import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

function RegisterButton() {
  return (
    <div>
      <Link
        href="/signup"
        className="bg-[#0e0a38] inline-block flex justify-center w-24 md:w-32 lg:w-32 gap-1 md:gap-2 lg:gap-2 p-2 md:p-3 lg:p-3 rounded-md text-white"
      >
        <User className="w-4 md:w-4 lg:w-5" /> <span className="text-sm md:text-md lg:text-md">Register</span>
      </Link>
    </div>
  );
}

export default RegisterButton;
