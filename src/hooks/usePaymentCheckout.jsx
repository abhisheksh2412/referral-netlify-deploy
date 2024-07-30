import { resetRedirectUrl } from "@/store/slices/common";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const usePaymentCheckout = (checkOut, localName = "store_payment") => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const initiateCheckout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("store_payment");
    }
    const redirectUrl = checkOut;

    if (redirectUrl) {
      const paymentWindow = window.open(
        redirectUrl,
        "",
        "width=900,height=800"
      );

      dispatch(resetRedirectUrl());
      if (!paymentWindow) {
        console.error("Failed to open payment window.");
      } else {
        // Polling interval to check localStorage
        const intervalId = setInterval(() => {
          const storePayment =
            typeof window !== "undefined" && localStorage.getItem(localName);

          if (storePayment) {
            clearInterval(intervalId);

            try {
              const paymentData = JSON.parse(decodeURIComponent(storePayment));
              const { status, sessionId } = paymentData;

              setStatus(status);
              setSessionId(sessionId);
            } catch (error) {
              console.error("Failed to parse store_payment:", error);
            }
          }
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, [checkOut]);

  useEffect(() => {
    initiateCheckout();
  }, [initiateCheckout]);

  return { status, sessionId, initiateCheckout };
};

export default usePaymentCheckout;
