"use client";

import { store } from "@/store";
import { Provider } from "react-redux";
import { StateManagerProvider } from "@/providers/useStateManager";
import { SellerProvider } from "@/providers/useSellerOrders";
import { useEffect } from "react";
import FcmTokenComp from "@/components/firebaseForeground";
import { Toaster } from "react-hot-toast";
export default function Providers({ children }) {
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src =
  //     "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   document.body.appendChild(script);

  //   const scriptContent = document.createElement("script");
  //   scriptContent.innerHTML = `
  //     function googleTranslateElementInit() {
  //       new google.translate.TranslateElement({
  //         pageLanguage: 'en',
  //         includedLanguages: 'pl',
  //         autoDisplay: false
  //       }, 'google_translate_element');
  //     }
  //   `;
  //   document.body.appendChild(scriptContent);

  //   const intervalId = setInterval(() => {
  //     if (window.google && window.google.translate) {
  //       const translateElement = document.querySelector(".goog-te-combo");
  //       if (translateElement) {
  //         translateElement.value = "pl";
  //         translateElement.dispatchEvent(new Event("change"));
  //         clearInterval(intervalId);
  //       }
  //     }
  //   }, 100);

  //   return () => clearInterval(intervalId);
  // }, []);
  return (
    <Provider store={store}>
      <StateManagerProvider>
        <SellerProvider>
          {typeof window !== "undefined" ? <FcmTokenComp /> : null}
          <Toaster />

          {children}
        </SellerProvider>
      </StateManagerProvider>
    </Provider>
  );
}
