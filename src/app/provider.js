"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { StateManagerProvider } from "@/providers/useStateManager";
import { SellerProvider } from "@/providers/useSellerOrders";
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <StateManagerProvider>
        <SellerProvider>{children}</SellerProvider>
      </StateManagerProvider>
    </Provider>
  );
}
