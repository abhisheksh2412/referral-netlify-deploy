import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { VscVerified } from "react-icons/vsc";
import clsx from "clsx";
import { Clock10Icon } from "lucide-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { GetPartner, VerifyManager } from "@/store/slices/partner";
import { GetSellerStorebyId, GetStores, PartnerGetManager, PartnerGetSeller } from "@/store/slices/seller";
import EasySelect from "@/components/globals/EasySelect";
import { Button } from "@material-tailwind/react";
import { popup } from "@/_utils/alerts";
import Loader from "@/components/globals/Loader";

const RenderStatus = ({ status }) => {
  switch (status) {
    case "active":
      return (
        <span
          className={clsx(
            "bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-1 rounded-full inline-flex items-center gap-1"
          )}
        >
          <VscVerified className="w-4 h-4" />
          Verified
        </span>
      );
    case "pending":
      return (
        <span
          className={clsx(
            "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2 py-1 rounded-full inline-flex items-center gap-1"
          )}
        >
          <Clock10Icon className="w-4 h-4" />
          Pending
        </span>
      );

    default:
      break;
  }
};

function ManagerDetails({ data, handleClose }) {
  const partner = useSelector((state) => state.partner);
  const dispatch = useDispatch();
  const storesData = useSelector((state) => state.seller);
  const [formdata, setFormData] = useState({ user_id: data?.id });

  const handleFormData = (key, value) => {
    setFormData({ ...formdata, [key]: value });
  };

  const getPartnerByid = useCallback(() => {
    dispatch(GetPartner(data?.id));
    dispatch(GetSellerStorebyId(data?.id));
    dispatch(GetStores());
  }, [dispatch, data?.id]);
  // get partner by partner id

  useEffect(() => {
    getPartnerByid();
  }, [getPartnerByid]);

  const storesList = useMemo(() => {
    return storesData?.stores?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }, [storesData?.stores]);

  const handleVerify = useCallback(
    async (formdata) => {
      await dispatch(VerifyManager(formdata));
      dispatch(PartnerGetManager());
      dispatch(PartnerGetSeller());
      handleClose();
    },
    [dispatch]
  );

  return (
    <Loader isLoading={partner?.isLoading}>
      <div>
        <div className=" bg-white rounded-lg  relative p-2  rounded-b-lg border-2">
          <div className="flex items-center gap-4 ">
            <div className="w-1/5">
              <Image
                src={data?.profile_photo_url}
                width={120}
                height={120}
                alt="User_image"
                className="rounded bg-white shadow p-1"
              />
            </div>
            <div className="w-4/5">
              <h3 className="text-base font-semibold  text-pink-400 mb-2">
                {data?.name}
              </h3>
              <h5 className="text-gray-500 text-sm mb-2">{data?.email}</h5>
              <RenderStatus status={data?.status} />
            </div>
          </div>
        </div>
        <div className="p-1">
          <h3 className="text-base font-semibold  text-pink-400 mb-1">
            Personal Info
          </h3>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg mb-3">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Name
                  </th>
                  <td class="px-6 py-2 font-medium text-black">{data?.name}</td>
                </tr>

                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Email
                  </th>
                  <td class="px-6 py-2 font-medium text-black">
                    {data?.email}
                  </td>
                </tr>

                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Contact
                  </th>
                  <td class="px-6 py-2 font-medium text-black">
                    {data?.mobile_number}
                  </td>
                </tr>

                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Date
                  </th>
                  <td class="px-6 py-2 font-medium text-black">
                    {moment(data?.created_at).format("DD-MM-YYYY hh:mm A")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-1">
          <h3 className="text-base font-semibold  text-pink-400 mb-1">
            Partner Info
          </h3>
          <div className=" bg-white rounded-lg  relative p-2  rounded-b-lg border-2">
            <div className="flex items-center gap-4 ">
              <div className="w-1/5">
                <Image
                  src={partner?.data?.profile_photo_url}
                  width={120}
                  height={120}
                  alt="Picture of the author"
                  className="rounded bg-white shadow p-1"
                />
              </div>
              <div className="w-4/5">
                <h3 className="text-base font-semibold  text-pink-400 mb-2">
                  {partner?.data?.name}
                </h3>
                <h5 className="text-gray-500 text-sm mb-2">
                  {partner?.data?.email}
                </h5>
                <RenderStatus status={partner?.data?.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-1">
          {data?.status === "active" && (
            <h3 className="text-base font-semibold  text-pink-400 mb-1">
              Store Info
            </h3>
          )}
          {storesData?.sellerStores?.length === 0 && (
            <h6 className="text-sm font-semibold text-gray-800 py-5">
              {" "}
              No Stores Found
            </h6>
          )}
          {storesData?.sellerStores?.length !== 0 &&
            storesData?.sellerStores?.map((item, index) => (
              <div
                key={index}
                className=" bg-white rounded-lg  relative p-2  rounded-b-lg border-2"
              >
                <div className="flex items-center gap-4 ">
                  <div className="w-1/5">
                    <Image
                      src={item?.stores?.logo}
                      width={120}
                      height={120}
                      alt="Picture of the author"
                      className="rounded bg-white shadow p-1"
                    />
                  </div>
                  <div className="w-4/5">
                    <h3 className="text-base font-semibold  text-pink-400 mb-2">
                      {item?.stores?.name}
                    </h3>
                    <h5 className="text-gray-500 text-sm mb-2">
                      {item?.stores?.description}
                    </h5>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {data?.status !== "active" && (
          <div className="p-1">
            <div className="p-2 border rounded-md flex flex-col gap-3">
              <h6 className="p-2 bg-pink-100 text-gray-800 font-semibold text-sm rounded-md">
                Verify Seller Account
              </h6>
              <span>
                <label
                  htmlFor="store"
                  className="text-sm font-medium text-gray-600"
                >
                  Assign Store
                </label>
                <EasySelect
                  handleChange={(value) =>
                    handleFormData("store_id", value?.value)
                  }
                  className="text-sm font-medium"
                  options={storesList}
                  menuPlacement="top"
                />
              </span>

              <Button
                className="bg-blush-red"
                onClick={() => handleVerify(formdata)}
              >
                Verify
              </Button>
            </div>
          </div>
        )}
      </div>
    </Loader>
  );
}

export default ManagerDetails;
