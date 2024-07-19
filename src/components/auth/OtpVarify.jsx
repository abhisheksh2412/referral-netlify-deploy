import { CheckCircle, Pen, PenLine } from "lucide-react";
import { useCallback, useState } from "react";
import OtpInput from "../globals/InputOtp";
import { useDispatch, useSelector } from "react-redux";
import { VerifyCode } from "@/store/slices/common";
import { popup } from "@/_utils/alerts";
import { useStateManager } from "@/providers/useStateManager";

export default function VerifyPage({ setCurrentStep }) {
  const { email } = useStateManager();
  const [code, setCode] = useState(null);
  const handleCode = (code) => setCode(code);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.common);

  const handleSubmit = async (code) => {
    await dispatch(VerifyCode(code));
    if (await data.isSuccess) {
      popup({ status: "success", message: "Otp Verified" });
      setCurrentStep(2);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full p-5 py-8 rounded-md  ">
        <h1 className="text-lg font-semibold text-blush-red text-center">
          Verify Email
        </h1>
        <h6 className="text-sm text-gray-700 text-center pt-5">
          We have sent you a 6 digit code. Please Enter Here to Verify Email.
        </h6>

        <span className="flex items-center gap-1 pb-5 pt-2 justify-center">
          <h6 className="py-1.5 px-2 bg-gray-300 text-gray-700 rounded-3xl flex text-xs relative ">
            {email}{" "}
          </h6>
          <button
            onClick={() => setCurrentStep(0)}
            className="w-fit py-1.5 px-2 hover:shadow-lg transition-shadow bg-pink-100 text-blush-red  rounded-full"
          >
            <PenLine size={13} />
          </button>
        </span>

        {/* otp inputs */}
        <div className="w-full flex justify-center items-center pt-4 pb-2">
          <OtpInput length={6} onChange={handleCode} />
        </div>

        {/* resend otp */}
        <h6 className="flex justify-center gap-1 text-sm text-center w-full pb-8">
          Didn&apos;t Receive Code ?
          <button className="text-blush-red underline">Get a New One</button>
        </h6>

        <button
          onClick={() => handleSubmit(code)}
          className="text-sm bg-blush-red w-full rounded-md p-2 text-white flex gap-3 items-center justify-center"
        >
          Varify and Continue <CheckCircle size={16} />
        </button>
      </div>
    </div>
  );
}
