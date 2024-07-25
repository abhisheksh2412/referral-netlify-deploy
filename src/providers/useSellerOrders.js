const {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} = require("react");

const SellerContext = createContext(null);

export const SellerProvider = ({ children }) => {
  // Countdown state and logic moved to the context provider
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let interval = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const startCountdown = useCallback((newTime) => {
    setTime(newTime);
    setIsActive(true);
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <SellerContext.Provider
      value={{
        time: formatTime(time),
        isActive,
        startCountdown,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

export const useSellerContext = () => {
  return useContext(SellerContext);
};
