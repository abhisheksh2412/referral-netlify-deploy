"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { StateManagerProvider } from "@/providers/useStateManager";

import LoaderFuntion from "./Loader";
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <StateManagerProvider>{children}</StateManagerProvider>
    </Provider>
  );
}
