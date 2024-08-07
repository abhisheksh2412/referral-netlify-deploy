import React, { useState } from "react";
import { useSelector } from "react-redux";

function VoucherTable() {
  const { userByCard, isLoading } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const filteredData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.coupon_code));
    }
    return newdata;
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="flex items-center justify-between mobile:!inline-block mobile:w-full p-5 mobile:p-2 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          <div className="pb-0  dark:bg-gray-900">
            <label for="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="table-search"
                className="block shadow-inherit outline-none p-3 ps-10 text-sm text-gray-900 bg-white rounded-lg"
                placeholder="Enter Coupon Code"
              />
            </div>
          </div>

          <div>
            <h1 className="text-lg leading-tight mb-0 font-semibold text-center mobile:text-left mobile:mt-3">
              Available BarCode List
            </h1>
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Voucher Name
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Status
              </th>
            </tr>
          </thead>
          {filteredData(search, userByCard?.coupons)?.length === 0 ? (
            <tbody>
              <tr>
                <h5 className="text-sm text-gray-600 text-center p-2">
                  {" "}
                  no Coupons
                </h5>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {filteredData(search, userByCard?.coupons)?.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.coupon_code}
                  </th>
                  <td className="px-6 py-4 text-right">
                    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {item?.status}
                    </span>
                  </td>
                </tr>
              ))}

              {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                VUCHR024
              </th>
              <td className="px-6 py-4 text-right">
                <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  Deactive
                </span>
              </td>
            </tr> */}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default VoucherTable;
