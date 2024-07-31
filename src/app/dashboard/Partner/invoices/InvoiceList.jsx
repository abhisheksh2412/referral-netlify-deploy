"use client";
import Container from "@/components/globals/container";
import Loader from "@/components/globals/Loader";
import { GetInvoiceData } from "@/store/slices/partner";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@material-tailwind/react";
import { current } from "@reduxjs/toolkit";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function InvoiceList() {
  const { invoiceData, isLoading, isSuccess } = useSelector(
    (state) => state.partner
  );
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const dispatch = useDispatch();

  const handleSetMonth = useCallback(() => {
    const currentDate = new Date();
    const oneMonthBeforeDate = new Date();
    oneMonthBeforeDate.setMonth(currentDate.getMonth() - 1);
    setFromDate(moment(oneMonthBeforeDate).format("YYYY-MM-DD"));
    setToDate(moment(currentDate).format("YYYY-MM-DD"));
  }, []);

  useEffect(() => {
    handleSetMonth();
  }, [handleSetMonth]);

  useEffect(() => {
    if (fromDate && toDate) {
      dispatch(GetInvoiceData(fromDate, toDate));
    }
  }, [dispatch, fromDate, toDate]);
  const filterInvoiceData = useCallback(
    (data) => {
      let invoices = data;
      if (search.length > 0) {
        const regex = new RegExp(`(${search})`, "i");
        invoices = data
          .filter((item) => regex.test(item?.invoice?.subscriber_name))
          .map((item) => {
            const highlightedName = item.invoice.subscriber_name.replace(
              regex,
              (match) =>
                `<span class="bg-pink-500 text-white px-1 rounded-md">${match}</span>`
            );
            return { ...item, highlightedName };
          });
      }
      setFilteredData(invoices);
    },
    [search, invoiceData]
  );

  useEffect(() => {
    filterInvoiceData(invoiceData);
  }, [filterInvoiceData]);

  const handleGetLastMonthData = useCallback(() => {
    const currentDate = new Date();
    const oneMonthBeforeDate = new Date();
    oneMonthBeforeDate.setMonth(currentDate.getMonth() - 1);
    const lastMonthStartDate = new Date();
    lastMonthStartDate.setMonth(currentDate.getMonth() - 2);

    setFromDate(moment(lastMonthStartDate).format("YYYY-MM-DD"));
    setToDate(moment(oneMonthBeforeDate).format("YYYY-MM-DD"));
  }, []);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <Container>
          <div className="py-32 md:py-8 mobile:p-4">
            <div className="p-8 mobile:p-4 shadow-custom-inset rounded-md">
              <div className="grid lg:grid-cols-3 mobile:grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                <div className="col-span-2 grid lg:grid-cols-3 mobile:grid-cols-1 gap-2 md:grid-cols-2 mobile:gap-4">
                  <Button
                    className="bg-[#2A0134]"
                    onClick={() => handleGetLastMonthData()}
                  >
                    Last Month
                  </Button>
                  <Button
                    className="bg-blush-red"
                    onClick={() => handleSetMonth()}
                  >
                    This Month
                  </Button>
                  {/* <Input
                    type="date"
                    label="From"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="!w-full"
                  />
                  <Input
                    type="date"
                    label="To"
                    min={fromDate}
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="!w-full"
                  /> */}
                </div>
                <div className="col-span-1">
                  <Input
                    label="Search By Subscriber Name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  />
                </div>
              </div>

              {/* content */}

              <div className="mt-5 grid lg:grid-cols-3 mobile:grid-cols-1 md:grid-cols-2 gap-3">
                {filteredData?.map((item, index) => (
                  <div
                    key={index}
                    className="border-b p-4 bg-gray-100 rounded-md"
                  >
                    <div className="border-dashed border-2 grid grid-cols-2 bg-white p-2">
                      <div className="flex flex-col gap-2">
                        <span className="flex flex-col gap-1">
                          <h5 className="text-sm">Invoice Number</h5>
                          <h6 className="text-xs text-gray-500">
                            {item?.invoice?.number}
                          </h6>
                        </span>
                        <span className="flex flex-col gap-1">
                          <h5 className="text-sm">Subscriber Name</h5>
                          <h6
                            className="text-xs text-gray-500"
                            dangerouslySetInnerHTML={{
                              __html:
                                item.highlightedName ||
                                item.invoice.subscriber_name,
                            }}
                          ></h6>
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        <span className="flex flex-col gap-1">
                          <h5 className="text-sm">Issued:</h5>
                          <h6 className="text-xs text-gray-500">
                            {moment(item?.invoice?.date).format("DD/MM/YYYY")}
                          </h6>
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 py-4">
                      <Button className="bg-white !text-gray-600 font-medium  text-nowrap">
                        Billing Period
                      </Button>
                      <Button className="bg-blush-red font-medium  text-nowrap">
                        {moment(item?.invoice?.billing_period).format(
                          "DD/MM/YYYY"
                        )}
                      </Button>
                      <Button className="bg-white !text-gray-600 font-medium  text-nowrap">
                        Date Of Payment
                      </Button>
                      <Button className="bg-blush-red font-medium text-nowrap">
                        {moment(item?.transactions?.date_recorded).format(
                          "DD/MM/YYYY"
                        )}
                      </Button>
                      <Button className="bg-white !text-gray-600 font-medium text-nowrap">
                        Adjustment
                      </Button>
                      <Button className="bg-blush-red font-medium  text-nowrap">
                        0.00
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Loader>
  );
}
