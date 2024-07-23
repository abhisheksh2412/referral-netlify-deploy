import { GetUserByCard } from "@/store/slices/userSlice";
import { useFormik } from "formik";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

function EnterCard({ reset }) {
  const dispatch = useDispatch();
  const getUser = useCallback(
    (cardno) => {
      dispatch(GetUserByCard(cardno));
    },
    [dispatch]
  );

  const formik = useFormik({
    initialValues: {
      card_no: "",
    },
    validationSchema: yup.object({
      card_no: yup
        .string()
        .required("Card No is Required")
        .min(16, "card number min length should be 16")
        .max(16, "card number maximum length should be 16"),
    }),
    onSubmit: async (values, { resetForm }) => {
      await getUser(values.card_no);
    },
  });

  const resetCard = useCallback(() => {
    formik.setFieldValue("card_no", "");
  });

  useEffect(() => {
    if (reset) {
      resetCard();
    }
  }, [reset]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cardno = localStorage.getItem("card_no");
      if (cardno) {
        formik.setFieldValue("card_no", cardno);
        getUser(cardno);
      }
    }
  }, []);
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-blush-red px-8 mobile:px-4 mobile:py-4 py-12 lg:w-1/2 mobile:w-full sm:w-5/6  mx-auto rounded-[1.5rem] shadow relative card-shape"
    >
      <div className="flex gap-4">
        <div>
          <img
            alt="cardImage"
            className="border-2 border-white p-1 w-20 rounded"
            src="/assets/credit-card.svg"
          />
        </div>
        <div>
          <h3 className="text-white text-lg	font-semibold">Enter Card No</h3>
          <p className="text-white">User Card No For Coupon & Points</p>
        </div>
      </div>
      <input
        type="text"
        name="card_no"
        value={formik.values.card_no}
        id="card_no"
        maxLength={16}
        minLength={16}
        onChange={formik.handleChange}
        class="block w-full rounded-full p-4  mt-5 shadow-inherit outline-none mb-6 text-center"
        placeholder="Enter Card No"
      />
      {formik.touched.card_no && formik.errors.card_no ? (
        <p className="text-xs text-white p-2">{formik.errors.card_no}</p>
      ) : null}

      <div className="flex items-center justify-center flex-col absolute left-0 right-0  -bottom-12 mobile:-bottom-16">
        <button
          type="submit"
          className="bg-white shadow-lg text-blush-red h-16 w-16 rounded-full flex items-center justify-center"
        >
          <ArrowRight />
        </button>
      </div>
    </form>
  );
}

export default EnterCard;
