import { useEffect, useState } from "react";

const usePaymentCheckout = (checkOut) => {
  const [status, setStatus] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const initiateCheckout = () => {
    localStorage.removeItem("store_payment");
    const redirectUrl = checkOut;

    if (redirectUrl) {
      const paymentWindow = window.open(
        redirectUrl,
        "",
        "width=900,height=800"
      );

      if (!paymentWindow) {
        console.error("Failed to open payment window.");
      } else {
        // Polling interval to check localStorage
        const intervalId = setInterval(() => {
          const storePayment = localStorage.getItem("store_payment");

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
  };

  useEffect(() => {
    initiateCheckout();
  }, [checkOut]);

  return { status, sessionId, initiateCheckout };
};

export default usePaymentCheckout;
