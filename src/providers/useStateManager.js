import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

const StateManagerContext = createContext();

export const StateManagerProvider = ({ children }) => {
  const [partnerVerifyEmail, setPartnerVerifyEmail] = useState("");
  const [email, setEmail] = useState("");
  const [couponList, setCouponList] = useState([]);
  const [plasticCardData, setPlasticCardData] = useState(null);
  const [paperCardData, setPaperCardData] = useState(null);
  const [birthdayInfo, setBirthdayInfo] = useState(null);
  const router = useRouter();
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(config.TOKEN_KEY)
      : "";

  const handleClick = useCallback(
    (path) => {
      const currentPath = window.location.pathname;
      const newPath = `${currentPath}${path}`;
      router.push(newPath);
    },
    [router]
  );

  const isWebShareSupported = () => {
    if (typeof window !== "undefined") {
      return navigator.share !== undefined;
    }
  };

  const shareUrl = async (url, title, text) => {
    if (isWebShareSupported()) {
      try {
        if (typeof window !==  "undefined") {
          await navigator.share({
            title: title,
            text: text,
            url: url,
          });
        }
      } catch (error) {
        console.error("Error sharing URL:", error);
      }
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };


  return (
    <StateManagerContext.Provider
      value={{
        email,
        setEmail,
        token,
        handleClick,
        partnerVerifyEmail,
        setPartnerVerifyEmail,
        shareUrl,
        couponList,
        setCouponList,
        birthdayInfo,
        plasticCardData,
        setPlasticCardData,
        paperCardData,
        setPaperCardData,
        setBirthdayInfo,
      }}
    >
      {children}
    </StateManagerContext.Provider>
  );
};

export const useStateManager = () => {
  return useContext(StateManagerContext);
};
