import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import seller from "./slices/seller";
import common from "./slices/common";
import combo from "./slices/combo";
import manager from "./slices/manager";
import products from "./slices/products";
import userSlice from "./slices/userSlice";
import category from "./slices/category";
import coupon from "./slices/coupon";
import orders from "./slices/orders";
import menuShopCafe from "./slices/menuShopCafe";
import partner from "./slices/partner";
import customer from "./slices/customer";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    seller: seller,
    common: common,
    combo: combo,
    manager: manager,
    product: products,
    user: userSlice,
    category: category,
    coupon: coupon,
    orders: orders,
    menu: menuShopCafe,
    partner: partner,
    customer: customer,
  },
});
