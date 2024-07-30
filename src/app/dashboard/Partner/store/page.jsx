"use client";
import PartnerHeader from "@/components/PartnerDashboard/header";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import StoreDetails from "@/components/globals/dashboard/StoreDetials";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { config } from "@/config/config";
import withAuth from "@/hoc/withAuth";
import { DeleteStore, GetStores } from "@/store/slices/seller";
import { PenBox, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Swal from "sweetalert2";

function PartnerStore() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const [selectedData, setSelectedData] = useState(null);
  const [detailsModal, setDetialsModal] = useState(null);
  const { stores, isLoading, isSuccess } = useSelector((state) => state.seller);

  const handleViewModal = (data) => {
    setDetialsModal(!detailsModal);
    setSelectedData(data);
  };

  const deleteStore = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(DeleteStore(id));
        dispatch(GetStores());
        if (await isSuccess) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const getAllData = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Manager Store List"} />
      <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="">
            <Container>
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-6">
                <h2 className="  text-center text-2xl mobile:text-lg font-semibold">
                  Popular stores
                </h2>
                <button
                  onClick={() =>
                    navigate.push("/dashboard/Partner/store/add-store")
                  }
                  className="p-2 bg-blush-red h-fit px-4 flex items-center gap-2 rounded-md text-sm text-white"
                >
                  <FaPlus /> Add Store
                </button>
              </div>

              <div className="grid grid-cols-12 mobile:grid-cols-12 gap-16 mobile:gap-3 sm:gap-4 mobile:mt-6">
                {stores?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="lg:col-span-3  mobile:col-span-6 sm:col-span-4"
                  >
                    <div className=" bg-white rounded-lg group  relative p-0 rounded-b-lg mb-4  hover:shadow-md transition-shadow">
                      <span className="absolute flex items-center gap-2 top-2 opacity-0 right-2 group-hover:opacity-100">
                        <button
                          className="p-1 text-red-600 cursor-pointer  bg-red-100 rounded-md "
                          onClick={() => deleteStore(item?.id)}
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          onClick={() =>
                            navigate.push(
                              `/dashboard/Partner/store/update-store/${item?.id}`
                            )
                          }
                          className="p-1 text-green-600 cursor-pointer  bg-green-100 rounded-md "
                        >
                          <PenBox size={15} />
                        </button>
                      </span>
                      <div
                        onClick={() => handleViewModal(item)}
                        className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50"
                      >
                     

                        <Image
                          src={config.IMAGE_URL_PATH + item?.logo}
                          width={500}
                          height={500}
                          alt="StoreImage"
                          class="w-32 h-32 mx-auto object-cover"
                        />

                      </div>
                      <h3 className="text-center p-4 font-medium">
                        {item?.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <Modal
                open={detailsModal}
                handleOpen={handleViewModal}
                size={"sm"}
              >
                <StoreDetails selectedData={selectedData} />
              </Modal>
            </Container>
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(PartnerStore);
