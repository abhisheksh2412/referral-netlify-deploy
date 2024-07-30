import { GetNotificationList } from "@/store/slices/common";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import Image from "next/image";
import moment from "moment";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Notification() {
  const user = useSelector((state) => state.auth.data);
  const { notifications } = useSelector((state) => state.common);
  const dispatch = useDispatch();

  const getNotificationsList = useCallback(() => {
    if (user?.id) {
      dispatch(GetNotificationList(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    getNotificationsList();
  }, [getNotificationsList]);

  return (
    <div>
      <Popover>
        <PopoverHandler>
          <button className="relative inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg mobile:h-10">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#0e0a38] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
              {notifications?.length}
            </div>
          </button>
        </PopoverHandler>
        <PopoverContent className="z-50  max-w-lg">
          <div>
            <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
              Notifications
            </div>
            {notifications?.length === 0 ? (
              <h6 className="text-sm font-semibold text-gray-700 py-3">
                {" "}
                No Notifications Found
              </h6>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {notifications?.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0">
                     

                      <Image
                        src="/assets/bell-icon-transparent-notification-free-png.png"
                        width={500}
                        height={500}
                        alt="Jese image"
                        className="rounded-full w-11 h-11"
                      />

                      {/* <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                      <svg
                        className="w-2 h-2 text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 18"
                      >
                        <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                        <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                      </svg>
                    </div> */}
                    </div>
                    <div className="w-full ps-3">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {item?.title}
                        </span>
                        : {item?.body}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        {moment(item?.created_at).startOf("hour").fromNow()}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {/* <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        type="button"
        className="relative inline-flex items-center px-3 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg "
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#0e0a38] border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
          8
        </div>
      </button> */}

      {/* <div
        id="dropdown"
        className={`z-10 ${
          isOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700 absolute mt-3 ml-[-335px] mt-6`}
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="/assets/pic1.jpg"
                alt="Jese image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                  <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                </svg>
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                New message from{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  Jese Leos
                </span>
                : "Hey, what's up? All set for the presentation?"
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                a few moments ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="/assets/pic2.jpg"
                alt="Joseph image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-gray-900 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                </svg>
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Joseph Mcfall
                </span>{" "}
                and{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  5 others
                </span>{" "}
                started following you.
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                10 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="/assets/pic3.jpg"
                alt="Bonnie image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-red-600 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                </svg>
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Bonnie Green
                </span>{" "}
                and{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  141 others
                </span>{" "}
                love your story. See it and view more stories.
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                44 minutes ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="/assets/pic4.jpg"
                alt="Leslie image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                </svg>
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Leslie Livingston
                </span>{" "}
                mentioned you in a comment:{" "}
                <span className="font-medium text-blue-500" href="#">
                  @bonnie.green
                </span>{" "}
                what do you say?
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                1 hour ago
              </div>
            </div>
          </a>
          <a
            href="#"
            className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="rounded-full w-11 h-11"
                src="/assets/pic5.jpg"
                alt="Robert image"
              />
              <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-purple-500 border border-white rounded-full dark:border-gray-800">
                <svg
                  className="w-2 h-2 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 14"
                >
                  <path d="M11 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm8.585 1.189a.994.994 0 0 0-.9-.138l-2.965.983a1 1 0 0 0-.685.949v8a1 1 0 0 0 .675.946l2.965 1.02a1.013 1.013 0 0 0 1.032-.242A1 1 0 0 0 20 12V2a1 1 0 0 0-.415-.811Z" />
                </svg>
              </div>
            </div>
            <div className="w-full ps-3">
              <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                <span className="font-semibold text-gray-900 dark:text-white">
                  Robert Brown
                </span>{" "}
                posted a new video: Glassmorphism - learn how to implement the
                new design trend.
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-500">
                3 hours ago
              </div>
            </div>
          </a>
        </div>
      </div> */}
    </div>
  );
}

export default Notification;
