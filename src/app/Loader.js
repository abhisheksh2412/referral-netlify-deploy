"use client";

import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function LoaderFunction({ children }) {
  const [progress, setProgress] = useState(0);
  const {
    auth,
    category,
    combo,
    common,
    coupon,
    manager,
    menu,
    orders,
    product,
    seller,
    user,
  } = useSelector((state) => state);

  useEffect(() => {
    const total = 11;
    const isLoadingCount =
      (auth.isLoading ? 1 : 0) +
      (category.isLoading ? 1 : 0) +
      (combo.isLoading ? 1 : 0) +
      (common.isLoading ? 1 : 0) +
      (coupon.isLoading ? 1 : 0) +
      (manager.isLoading ? 1 : 0) +
      (menu.isLoading ? 1 : 0) +
      (orders.isLoading ? 1 : 0) +
      (product.isLoading ? 1 : 0) +
      (seller.isLoading ? 1 : 0) +
      (user.isLoading ? 1 : 0);

    const progress = (isLoadingCount / total) * 100;
    setProgress(progress);
  }, [
    auth.isLoading,
    category.isLoading,
    combo.isLoading,
    common.isLoading,
    coupon.isLoading,
    manager.isLoading,
    menu.isLoading,
    orders.isLoading,
    product.isLoading,
    seller.isLoading,
    user.isLoading,
  ]);

  const loadingBarRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (progress > 0 && progress < 100) {
      loadingBarRef.current?.continuousStart();
    } else {
      loadingBarRef.current?.complete();
    }
  }, [progress]);

  useEffect(() => {
    loadingBarRef.current?.continuousStart();
    const timer = setTimeout(() => {
      loadingBarRef.current?.complete();
    }, 500); // Complete the bar after 500ms, you can adjust this duration

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <>
      <LoadingBar color="#f4739e" progress={progress} ref={loadingBarRef} />
      {children}
    </>
  );
}
