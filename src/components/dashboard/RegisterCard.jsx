"use client";

import { useDispatch, useSelector } from "react-redux";
import EasySelect from "../globals/EasySelect";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetAllCardsByStoreId, GetSellerStores } from "@/store/slices/seller";
import Loader from "../globals/Loader";
import { useFormik } from "formik";
import { AssignCardToUserValidations } from "@/validators/registerUserValidations";
import { RegisterCardToUser } from "@/store/slices/userSlice";
import { popup } from "@/_utils/alerts";

const options = [
  {
    label: "12314585558887",
    value: "name",
    label: "89514585558887",
    value: "name",
  },
];
export default function RegisterCard({ handleClose }) {
  const user = useSelector((state) => state.auth.data);
  const { stores, isLoading } = useSelector((state) => state.seller);
  const cards = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const getSellerStores = useCallback(() => {
    dispatch(GetSellerStores(user?.id));
  }, [dispatch, user?.id]);

  const getCardsAsperStoreId = useCallback(() => {
    if (stores.length > 0) {
      dispatch(GetAllCardsByStoreId(stores[0]?.store_id));
    }
  }, [dispatch, stores]);

  const cardsList = useMemo(() => {
    return cards?.cards?.data?.map((item) => ({
      label: item?.card_number,
      value: item?.id,
    }));
  }, [cards?.cards]);

  useEffect(() => {
    getSellerStores();
  }, [getSellerStores]);

  useEffect(() => {
    getCardsAsperStoreId();
  }, [getCardsAsperStoreId]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      surname: "",
      card_id: "",
    },
    validationSchema: AssignCardToUserValidations,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(RegisterCardToUser(values));
      if (cards?.isSuccess) {
        resetForm();
        popup({ status: "success", message: "card Assign success" });
        handleClose();
      }
    },
  });

  return (
    <Loader isLoading={isLoading}>
      <div className="p-6">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="text-xs text-red-500 p-1">{formik.errors.name}</p>
              ) : null}
            </div>
            <div>
              <label
                for="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="surname"
                value={formik.values.surname}
                name="surname"
                onChange={formik.handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
              />
              {formik.touched.surname && formik.errors.surname ? (
                <p className="text-xs text-red-500 p-1">
                  {formik.errors.surname}
                </p>
              ) : null}
            </div>
          </div>
          <div className="mb-6">
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-xs text-red-500 p-1">{formik.errors.email}</p>
            ) : null}
          </div>

          <div className="mb-6">
            <EasySelect
              options={cardsList}
              handleChange={(value) =>
                formik.setFieldValue("card_id", value.value)
              }
            />
            {formik.touched.card_id && formik.errors.card_id ? (
              <p className="text-xs text-red-500 p-1">
                {formik.errors.card_id}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="text-white bg-blush-red font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </Loader>
  );
}
