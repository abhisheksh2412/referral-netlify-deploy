"use client";

import { BarLoader } from "react-spinners";
import LoadingBar from "react-top-loading-bar";

export default function Loader({ isLoading, children }) {
  return (
    <>
      {isLoading && (
        <BarLoader
          className="!fixed top-0 left-0 !w-full"
          loading={isLoading}
          color="red"
        />
      )}

      {children}
    </>
  );
}
