"use client";

import { useFormik } from "formik";
import GlobalInput from "../globals/globalInput";
import { partnerSignupValidationsSchema } from "@/validators/authValidations";
import { useDispatch, useSelector } from "react-redux";
import { RegisterPartner } from "@/store/slices/authSlice";
import {
  Building,
  Building2,
  Earth,
  FileDigit,
  Key,
  Mail,
  NotepadText,
  Phone,
  Signpost,
  User,
  UsersRound,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import OtpForm from "./PartnerOptVerify";
import { useStateManager } from "@/providers/useStateManager";
import toast from "react-hot-toast";
import Link from "next/link";
import Swal from "sweetalert2";
import { VerifyOtpAndActivateUser } from "@/store/slices/common";
import { useRouter } from "next/navigation";

export default function PartnerSignup() {
  const { setPartnerVerifyEmail } = useStateManager();
  const router = useRouter();
  const otpRef = useRef();
  const { isSuccess } = useSelector((state) => state.auth);
  const { isLoading, isActivated } = useSelector((state) => state.common);
  const [openOtpPopup, setOpenOtpPop] = useState(false);
  const [fromdata, setFormData] = useState(null);
  const { partnerVerifyEmail } = useStateManager();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      street: "",
      house_no: "",
      postal_code: "",
      password: "",
      password_confirmation: "",
      mobile_number: "",
      city: "",
      website: "",
      business_name: "",
      nip_number: "",
      industry: "",
      description: "",
      referral_code: "",
      agreestoterms: false,
    },
    onSubmit: async (values, { resetForm }) => {
      if (values.agreestoterms === false) {
        toast.error("Please Agree the Terms and Conditions");
      } else {
        setFormData(values);
        setPartnerVerifyEmail(values.email);
        await dispatch(RegisterPartner(values, () => setOpenOtpPop(true)));
      }
    },
    validationSchema: partnerSignupValidationsSchema,
  });

  const handleOtpVerify = useCallback(async () => {
    if (await openOtpPopup) {
      const { value: otp } = await Swal.fire({
        input: "number",
        inputLabel: "Enter Opt",
        inputPlaceholder: "Enter the Otp",
      });
      if (otp) {
        const formdata = {
          remember_token: otp,
          email: fromdata.email,
        };
        toast.promise(
          dispatch(VerifyOtpAndActivateUser(formdata, () => router.back())),

          {
            loading: "Verifying Code ...",
            success: "Verified and Registered User Successfully",
            error: "failed to verify code",
          }
        );
      }
      setOpenOtpPop(false);
    }
  }, [openOtpPopup]);

  useEffect(() => {
    handleOtpVerify();
  }, [openOtpPopup]);
  return (
    <div className="flex w-full items-center justify-center">
      {/* <OtpForm ref={otpRef} /> */}
      <form
        onSubmit={formik.handleSubmit}
        className=" bg-white w-full grid grid-cols-12 gap-4 "
      >
        <GlobalInput
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<User className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
          name="name"
          placeholder="Enter Your Full Name"
        />
        <GlobalInput
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<User className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="text"
          value={formik.values.street}
          onChange={formik.handleChange}
          error={
            formik.touched.street && formik.errors.street
              ? formik.errors.street
              : null
          }
          name="street"
          placeholder="Enter Your Street"
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<User className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          value={formik.values.house_no}
          onChange={formik.handleChange}
          error={
            formik.touched.house_no && formik.errors.house_no
              ? formik.errors.house_no
              : null
          }
          placeholder="Enter Your House Number"
          name="house_no"
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<User className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter Your Town Address"
          name="city"
          onChange={formik.handleChange}
          value={formik.values.city}
          error={
            formik.touched.city && formik.errors.city
              ? formik.errors.city
              : null
          }
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Signpost className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Postal Code"
          name="postal_code"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          error={
            formik.touched.postal_code && formik.errors.postal_code
              ? formik.errors.postal_code
              : null
          }
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Mail className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter your Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
        />
        <GlobalInput
          type="password"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Key className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
        />
        <GlobalInput
          type="password"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Key className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Confirm Password"
          name="password_confirmation"
          value={formik.values.password_confirmation}
          onChange={formik.handleChange}
          error={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
              ? formik.errors.password_confirmation
              : null
          }
        />
        <GlobalInput
          type="number"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Phone className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter Mobile Number"
          name="mobile_number"
          value={formik.values.mobile_number}
          onChange={formik.handleChange}
          error={
            formik.touched.mobile_number && formik.errors.mobile_number
              ? formik.errors.mobile_number
              : null
          }
        />
        <GlobalInput
          type="url"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Earth className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter Your Website"
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          error={
            formik.touched.website && formik.errors.website
              ? formik.errors.website
              : null
          }
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Building2 className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter Your Business Name"
          name="business_name"
          value={formik.values.business_name}
          onChange={formik.handleChange}
          error={
            formik.touched.business_name && formik.errors.business_name
              ? formik.errors.business_name
              : null
          }
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<FileDigit className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="NIP number"
          name="nip_number"
          value={formik.values.nip_number}
          onChange={formik.handleChange}
          error={
            formik.touched.nip_number && formik.errors.nip_number
              ? formik.errors.nip_number
              : null
          }
        />
        <GlobalInput
          type="text"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Building className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          placeholder="Enter Your Industry Name"
          name="industry"
          value={formik.values.industry}
          onChange={formik.handleChange}
          error={
            formik.touched.industry && formik.errors.industry
              ? formik.errors.industry
              : null
          }
        />
        <GlobalInput
          name="description"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<NotepadText className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="text"
          placeholder="Enter Your Short Discription"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null
          }
        />
        <GlobalInput
          name="referral_code"
          className="col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<UsersRound className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="text"
          placeholder="Reffral Code (Optional)"
          value={formik.values.referral_code}
          onChange={formik.handleChange}
          error={
            formik.touched.referral_code && formik.errors.referral_code
              ? formik.errors.referral_code
              : null
          }
        />
        <div className="flex items-start col-span-12 gap-2">
          <input
            type="checkBox"
            onChange={formik.handleChange}
            name="agreestoterms"
            checked={formik.values.agreestoterms === true}
          />
          <p className="text-xs">
            Please read the terms and conditions. you must agree by checking the
            box{" "}
            <a className="text-blush-red" href="/">
              Read more
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="bg-blush-red p-3 w-full rounded-md text-sm font-semibold col-span-12 text-white "
        >
          Sign up
        </button>

        <div className="col-span-12 text-sm text-center">
          <h6>
            Already have an Account?{" "}
            <Link href="/login" className="underline text-blush-red">
              Login
            </Link>
          </h6>
        </div>
      </form>
    </div>
  );
}
