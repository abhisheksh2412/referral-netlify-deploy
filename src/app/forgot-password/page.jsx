"use client";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import VerifyPage from "@/components/auth/OtpVarify";
import ResetPassword from "@/components/auth/ResetPassword";
import BreadcrumbGlobal from "@/components/globals/BreadCrumb";
import Footer from "@/components/home/footer";
import HomeHeader from "@/components/home/homeHeader";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

// stepper
const Stepper = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center w-full">
      {steps.map((_, index) => (
        <div
          key={index}
          className={clsx(
            "flex items-center",
            index !== steps.length - 1 && "flex-1"
          )}
        >
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-full transition-colors duration-500 ${
              index <= currentStep
                ? "bg-blush-red text-white"
                : "bg-transparent  border border-blush-red text-blush-red"
            }`}
          >
            {index + 1}
          </div>
          {index < steps.length - 1 && (
            <div className="flex-auto border-t-2 relative transition-all duration-500">
              <div
                className={`absolute top-0 left-0 h-full w-full transition-width duration-500 ${
                  index < currentStep ? "bg-blush-red" : "bg-gray-300"
                }`}
                style={{
                  width: index < currentStep ? "100%" : "0%",
                }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isLoading } = useSelector((state) => state.common);
  const userLoading = useSelector((state) => state.user.isLoading);

  const steps = useMemo(
    () => [
      <ForgotPasswordForm
        key="forgot-password"
        setCurrentStep={setCurrentStep}
      />,
      <VerifyPage key="verify-page" setCurrentStep={setCurrentStep} />,
      <ResetPassword key="reset-password" setCurrentStep={setCurrentStep} />,
    ],
    [setCurrentStep]
  );

  return (
    <div>
      <HomeHeader />
      <div className="w-full mt-3 ">
      <div className="w-full h-[20vh] md:h-[30vh] lg:h-[40vh] bg-banner bg-no-repeat bg-cover flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-xl font-semibold text-gray-800 pb-0 md:pb-4 lg:pb-4 text-white">Forgot Password</h1>
            <BreadcrumbGlobal
              pageName="Forgot Password"
              description="Login page"
            />
          </div>
        </div>
        {isLoading || userLoading ? (
          <div className="fixed left-0 top-0 h-2 rounded-full w-full bg-gradient-to-r from-blush-red to-blue-600 animate-slide"></div>
        ) : null}
        <div className="w-full flex items-center p-6 justify-center py-12 md:py-20 lg:py-20">
          <div className="flex flex-col gap-3 md:gap-5 lg:gap-5 p-4 md:p-6 lg:p-10 border bg-white shadow rounded-xl  w-full sm:w-6/12 md:w-8/12	 lg:w-6/12 xl:w-4/12 m-landscape:w-8/12">
            <Stepper steps={steps} currentStep={currentStep} />
            <div className="mt-5 ">{steps[currentStep]}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
