import { useFormik } from "formik";
import GlobalInput from "../globals/globalInput";
import { useDispatch } from "react-redux";
import { RegisterNormalUser } from "@/store/slices/authSlice";
import { UserSignupValidationsSchema } from "@/validators/authValidations";
import { Key, LucideCalendarSearch, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UserSignup() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile_number: "",
      dob: "",
      password: "",
      password_confirmation: "",
      agreestoterms: false,
    },
    onSubmit: async (values, { resetForm }) => {
      if (!values.agreestoterms) {
        toast.error("Please Agree the Terms and Conditions");
      } else {
        await dispatch(RegisterNormalUser(values));
        resetForm();
      }
    },
    validationSchema: UserSignupValidationsSchema,
  });

  return (
    <div className="bg-gray-100 w-full h-fit flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className=" bg-white rounded-md w-full grid grid-cols-12 gap-4 "
      >
        <GlobalInput
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<User className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="text"
          name="name"
          placeholder="Enter your Full Name"
          onChange={formik.handleChange}
          error={
            formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null
          }
          value={formik.values.name}
        />
        <GlobalInput
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Mail className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          type="email"
          name="email"
          placeholder="Enter your email address"
          error={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <GlobalInput
          type="tel"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3 "
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Phone className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          name="mobile_number"
          placeholder="Enter your Mobile No"
          error={
            formik.touched.mobile_number && formik.errors.mobile_number
              ? formik.errors.mobile_number
              : null
          }
          onChange={formik.handleChange}
          value={formik.values.mobile_number}
        />
        <GlobalInput
          type="date"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={
            <LucideCalendarSearch className="text-gray-700 text-xs" size={15} />
          }
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          name="dob"
          placeholder="05-12-2024"
          error={
            formik.touched.dob && formik.errors.dob ? formik.errors.dob : null
          }
          onChange={formik.handleChange}
          value={formik.values.dob}
        />
        <GlobalInput
          type="password"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Key className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          name="password"
          placeholder="Enter your Password"
          error={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null
          }
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <GlobalInput
          type="password"
          className="col-span-12 md:col-span-6 sm:col-span-12"
          parentClassName="p-0 border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Key className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-4 px-4 md:p-4 md:px-4 lg:p-5 lg:px-6 rounded-sm"
          name="password_confirmation"
          placeholder="Confirm your Enter Password"
          error={
            formik.touched.password_confirmation &&
            formik.errors.password_confirmation
              ? formik.errors.password_confirmation
              : null
          }
          onChange={formik.handleChange}
          value={formik.values.password_confirmation}
        />
        <div className="flex items-start col-span-12 gap-2">
          <GlobalInput
            name="agreestoterms"
            onChange={formik.handleChange}
            value={formik.values.agreestoterms}
            type="checkbox"
            error={
              formik.touched.agreestoterms && formik.errors.agreestoterms
                ? formik.errors.agreestoterms
                : null
            }
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
          className="bg-blush-red p-4 px-4 mt-5 w-full rounded-md text-sm font-semibold col-span-12 text-white "
        >
          Signup
        </button>

        <div className="col-span-12 text-sm text-center">
          <h6>
            Already have an Account?{" "}
            <Link href="/login" className="underline text-blush-red">
              Login
            </Link>
          </h6>
        </div>
        {/* social authentications */}
        {/* <div className="col-span-12">
          <SocialAuthentication text={"Or Signup Using"} />
        </div> */}
      </form>
    </div>
  );
}
