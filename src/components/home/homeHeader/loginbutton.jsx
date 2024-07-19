"use client";
import { LogIn } from "lucide-react";
import Link from "next/link";
import React from "react";

function LoginButton() {
  return (
    <div>
      <Link
        href="/login"
        className="bg-blush-red inline-block flex justify-center w-24 md:w-32 lg:w-32 gap-1 md:gap-2 lg:gap-2 p-2 md:p-3 lg:p-3 rounded-md text-white"
      >
        <LogIn className="w-4 md:w-4 lg:w-5" />
        <span className="text-sm md:text-md lg:text-md">Login</span>
      </Link>
    </div>
  );
}

export default LoginButton;
