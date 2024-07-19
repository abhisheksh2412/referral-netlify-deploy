import { ChevronRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import GlobalInput from "../../globals/globalInput";
import { Checkbox } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddManager } from "@/store/slices/manager";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CreateManagerValdiations } from "@/validators/authValidations";
import { popup } from "@/_utils/alerts";
import Loader from "@/components/globals/Loader";
import { AddSeller } from "@/store/slices/seller";

export default function SellerCreateFrom({ handleClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");

  const dispatch = useDispatch();
  const seller = useSelector((state) => state.seller);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: CreateManagerValdiations,
    onSubmit: async (values, { resetForm }) => {
      if (!isCheckboxChecked) {
        setCheckboxError("You must agree to the terms and conditions.");
        return;
      }
      try {
        await dispatch(AddSeller(values));
        // resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (seller.isSuccess && !hasShownPopup) {
      popup({
        status: "success",
        message: "Seller Created Successfully",
      });
      handleClose(null);
      setHasShownPopup(true);
    }
  }, [seller.isSuccess, hasShownPopup, handleClose]);

  return (
    <Loader isLoading={seller.isLoading}>
      <div>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <span>
            <label htmlFor="name" className="text-sm font-medium ">
              Full Name
            </label>
            <GlobalInput
              type="text"
              placeholder="Enter your full name"
              leftIcon={<User size={15} />}
              parentClassName="flex items-center gap-2 border rounded-md p-2"
              inputClassName="outline-none text-sm text-gray-800"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={
                formik.touched.name && formik.errors.name
                  ? formik.errors.name
                  : null
              }
            />
          </span>
          <span>
            <label htmlFor="email" className="text-sm font-medium ">
              Email Address
            </label>
            <GlobalInput
              type="email"
              placeholder="Enter your Email Address"
              leftIcon={<Mail size={15} />}
              parentClassName="flex items-center gap-2 border rounded-md p-2"
              inputClassName="outline-none text-sm text-gray-800"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
          </span>
          <span>
            <label htmlFor="password" className="text-sm font-medium ">
              Password
            </label>
            <GlobalInput
              leftIcon={<Lock size={15} />}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              parentClassName="flex items-center gap-2 border rounded-md p-2"
              inputClassName="outline-none text-sm text-gray-800"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={
                formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null
              }
              rightIcon={
                showPassword ? (
                  <Eye
                    size={15}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeOff
                    size={15}
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )
              }
            />
          </span>
          <span>
            <label
              htmlFor="password_confirmation"
              className="text-sm font-medium "
            >
              Confirm Password
            </label>
            <GlobalInput
              type={confirmShowPassword ? "text" : "password"}
              leftIcon={<Lock size={15} />}
              placeholder="Enter your Confirm Password"
              parentClassName="flex items-center gap-2 border rounded-md p-2"
              inputClassName="outline-none text-sm text-gray-800"
              name="password_confirmation"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              error={
                formik.touched.password_confirmation &&
                formik.errors.password_confirmation
                  ? formik.errors.password_confirmation
                  : null
              }
              rightIcon={
                confirmShowPassword ? (
                  <Eye
                    size={15}
                    className="cursor-pointer"
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  />
                ) : (
                  <EyeOff
                    size={15}
                    className="cursor-pointer"
                    onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                  />
                )
              }
            />
          </span>

          <span className="flex items-end">
            <Checkbox
              className="checked:bg-blush-red checked:text-white checked:border-blush-red"
              checked={isCheckboxChecked}
              onChange={(e) => {
                setIsCheckboxChecked(e.target.checked);
                if (e.target.checked) {
                  setCheckboxError("");
                }
              }}
            />
            <h6 className="flex items-center flex-wrap text-xs text-wrap">
              Please read the terms and conditions. You must agree by checking
              the box{" "}
              <a href="/" className="text-blush-red text-xs">
                Read more
              </a>
            </h6>
          </span>
          {checkboxError && (
            <p className="text-red-500 text-xs">{checkboxError}</p>
          )}
          <button
            type="submit"
            className="text-sm flex items-center justify-center gap-2 bg-blush-red text-white p-2 px-3 w-full rounded-md"
          >
            Sign Up <ChevronRight />
          </button>
        </form>
      </div>
    </Loader>
  );
}
