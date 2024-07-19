// components/OtpForm.js
import { useStateManager } from "@/providers/useStateManager";
import { VerifyCode, VerifyOtpAndActivateUser } from "@/store/slices/common";
import { useRouter } from "next/navigation";
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const PartnerOtpVerify = forwardRef((props, ref) => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isActivated } = useSelector((state) => state.common);
  const { partnerVerifyEmail } = useStateManager();

  const handleOtpSubmit = async () => {
    const { value: enteredOtp } = await MySwal.fire({
      title: "Enter OTP",
      input: "text",
      inputLabel: "Your OTP",
      inputValue: otp,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter the OTP!";
        }
        if (value.length !== 6) {
          return "OTP must be 6 digits!";
        }
      },
      customClass: {
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        input: "swal2-input-custom",
      },
      confirmButtonColor: "#f4739e",
      cancelButtonColor: "#aaa",
    });

    if (enteredOtp) {
      await submitOtp(enteredOtp);
    }
  };

  const submitOtp = async (enteredOtp) => {
    try {
      if (isLoading) {
        MySwal.fire("Please wait", "Verifying OTP...", "info");
        return;
      }
      const formdata = {
        remember_token: enteredOtp,
        email: partnerVerifyEmail,
      };
      dispatch(VerifyOtpAndActivateUser(formdata));
    } catch (error) {
      console.error("Error verifying OTP:", error);
      MySwal.fire("Error", "Failed to verify OTP. Please try again.", "error");
    }
  };

  useEffect(() => {
    if (isActivated) {
      MySwal.fire("Success", "Your OTP is valid!", "success");
      router.push("/login");
    }
  }, [isActivated]);

  useImperativeHandle(ref, () => ({
    triggerOtp: handleOtpSubmit,
  }));

  return null;
});

PartnerOtpVerify.displayName = "PartnerOtpVerify";

export default PartnerOtpVerify;
