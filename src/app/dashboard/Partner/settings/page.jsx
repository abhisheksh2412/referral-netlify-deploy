"use client";
import { popup } from "@/_utils/alerts";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import GlobalInput from "@/components/globals/globalInput";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import { GetMaxpointByToken, SetMaxpointSetting } from "@/store/slices/partner";
import { MaxpointValidation } from "@/validators/partnerSetting";
import { useFormik } from "formik";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const { maxPointSetting, isLoading, isSuccess } = useSelector(
    (state) => state.partner
  );
  const { data } = maxPointSetting;
  const getMaxPoints = useCallback(() => {
    dispatch(GetMaxpointByToken());
  }, [dispatch]);

  useEffect(() => {
    getMaxPoints();
  }, [getMaxPoints]);

  const formik = useFormik({
    initialValues: {
      partner_id: user?.id,
      max_points_per_upload: data?.max_points_per_upload || "",
      max_points_per_day: data?.max_points_per_day || "",
      set_screen_timeout: data?.set_screen_timeout || "",
    },
    enableReinitialize: true,
    validationSchema: MaxpointValidation,
    onSubmit: async (values) => {
      if (user?.id) {
        await dispatch(SetMaxpointSetting(values));
        setTimeout(() => {
          if (isSuccess) {
            popup({ status: "success", message: "Max point set Successfully" });
          }
        }, 400);
      }
    },
  });

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"Max Point Setting"} />

        {/* Setting Card */}
        <div className="w-full flex justify-center py-8">
          <form
            className="lg:w-1/3 mobile:w-full sm:w-3/6 shadow-lg rounded-md p-8 flex flex-col gap-3"
            onSubmit={formik.handleSubmit}
          >
            <h1 className="text-blush-red text-center mb-5 col-span-2 font-semibold bg-pink-50 p-2 rounded-md">
              Max Point Setting
            </h1>
            <span className="flex flex-col gap-1">
              <h6 className="text-sm">Set max points per upload</h6>
              <GlobalInput
                type="number"
                placeholder="Please set max point"
                inputClassName="text-sm outline-none"
                parentClassName="border rounded-md p-2"
                name="max_points_per_upload"
                value={formik.values.max_points_per_upload}
                onChange={formik.handleChange}
                error={
                  formik.touched.max_points_per_upload &&
                  formik.errors.max_points_per_upload
                    ? formik.errors.max_points_per_upload
                    : null
                }
              />
            </span>
            <span className="flex flex-col gap-1">
              <h6 className="text-sm">Set max points per day</h6>
              <GlobalInput
                type="number"
                placeholder="Please set max point"
                inputClassName="text-sm outline-none"
                parentClassName="border rounded-md p-2"
                name="max_points_per_day"
                value={formik.values.max_points_per_day}
                onChange={formik.handleChange}
                error={
                  formik.touched.max_points_per_day &&
                  formik.errors.max_points_per_day
                    ? formik.errors.max_points_per_day
                    : null
                }
              />
            </span>

            <span className="flex flex-col gap-1">
              <h6 className="text-sm">Seller screen time out</h6>
              <GlobalInput
                type="number"
                placeholder="Please set time out in milliseconds (1000)"
                inputClassName="text-sm outline-none"
                parentClassName="border rounded-md p-2"
                name="set_screen_timeout"
                value={formik.values.set_screen_timeout}
                onChange={formik.handleChange}
                error={
                  formik.touched.set_screen_timeout &&
                  formik.errors.set_screen_timeout
                    ? formik.errors.set_screen_timeout
                    : null
                }
              />
            </span>

            <button
              type="submit"
              className="w-full p-2 mt-6 bg-blush-red text-white rounded-md"
            >
              ok
            </button>
          </form>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}
