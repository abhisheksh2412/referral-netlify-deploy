import Loader from "@/components/globals/Loader";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function OrdersTable() {
  const { orderList, isLoading } = useSelector((state) => state.orders);

  return (
    <div>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
        <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
          <div className="flex items-center justify-between gap-8">
            <div>
              <h5 className="block  text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                All Orders
              </h5>
              <p className="block mt-1  text-base antialiased font-normal leading-relaxed text-gray-700">
                Order Details
              </p>
            </div>
            {/* <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full mt-4 text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block  text-base font-semibold antialiased font-normal leading-none text-blue-gray-900">
                    Order Id
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block text-base font-semibold antialiased font-normal leading-none text-blue-gray-900">
                    Order Date
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block text-base font-semibold antialiased font-normal leading-none text-blue-gray-900">
                    Order Total
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block text-base font-semibold antialiased font-normal leading-none text-blue-gray-900">
                    Status
                  </p>
                </th>
                <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                  <p className="block text-base font-semibold antialiased font-normal leading-none text-blue-gray-900">
                    Order Type
                  </p>
                </th>
              </tr>
            </thead>
            <Loader isLoading={isLoading}>
              <tbody>
                {orderList?.map((item, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block text-base antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.id}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block text-base antialiased font-normal leading-normal text-blue-gray-900">
                        {moment(item?.order_date).format(
                          "YYYY-MM-DD hh:mm:ss a"
                        )}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block text-base antialiased font-normal leading-normal text-blue-gray-900">
                        ${item?.order_total}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <span className="!inline  grid items-center px-2 py-2 text-center text-xs font-bold text-green-900 uppercase rounded-md select-none whitespace-nowrap bg-green-500/20">
                        {item?.status}
                      </span>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block text-base antialiased font-normal leading-normal text-blue-gray-900">
                        {item?.order_type}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Loader>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
