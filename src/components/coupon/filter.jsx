"use client";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React from "react";
import Container from "../globals/container";

export default function CouponFilter() {
  const data = [
    {
      label: "New (8)",
      value: "new",
      desc: `This is new`,
    },
    {
      label: "Active Coupon (0)",
      value: "active",
      desc: `this is active`,
    },
    {
      label: "Inactive Coupon (0)",
      value: "inactive",
      desc: `this is inactive`,
    },
  ];

  return (
    <Container>
      <Tabs value="new" className="">
        <div className="block p-2 bg-white border border-gray-200 rounded-full shadow  dark:bg-gray-800 dark:border-gray-700  w-3/5 mx-auto">
          <TabsHeader
            className="bg-transparent"
            indicatorProps={{
              className: "bg-blush-red shadow-none rounded-full",
            }}
          >
            {data.map(({ label, value }) => (
              <Tab
                className="p-3 font-semibold"
                activeClassName="!text-white"
                key={value}
                value={value}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </div>

        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </Container>
  );
}
