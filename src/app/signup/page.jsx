"use client";
import PartnerSignup from "@/components/auth/partnerSignup";
import UserSignup from "@/components/auth/userSignup";
import BreadcrumbGlobal from "@/components/globals/BreadCrumb";
import Footer from "@/components/home/footer";
import HomeHeader from "@/components/home/homeHeader";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";

export default function SignupPage() {
  return (
    <div>
      <HomeHeader />
      <div className="w-full">
      <div className="w-full h-[20vh] md:h-[30vh] lg:h-[40vh] bg-banner bg-no-repeat bg-cover flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Register</h1>
            <BreadcrumbGlobal pageName="signup" description="Signup Page" />
          </div>
        </div>
        <div className="w-full flex items-center justify-center p-6 py-12  md:p-20 lg:p-20 rounded-md m-landscape:p-3 m-landscape:py-12">
          <div className=" border shadow-lg p-4 md:p-8 lg:p-8 rounded-md  w-full sm:w-6/12 md:w-10/12 lg:w-9/12 xl:w-5/12	m-landscape:w-10/12 ">
            <Tabs id="custom-animation" value="user">
              <TabsHeader
                className="bg-pink-50 h-14"
                indicatorProps={{ className: "!bg-blush-red" }}
              >
                <Tab
                  value={"user"}
                  activeClassName="text-white delay-300"
                  className="font-semibold text-sm"
                >
                  Join as Program
                </Tab>
                <Tab
                  value={"partner"}
                  activeClassName="text-white delay-300"
                  className="font-semibold text-sm"
                >
                  Partner Program
                </Tab>
              </TabsHeader>
              <TabsBody
                animate={{
                  initial: { y: 250 },
                  mount: { y: 0 },
                  unmount: { y: 250 },
                }}
              >
                <TabPanel className="!px-0 !py-4" value={"user"}>
                  <UserSignup />
                </TabPanel>
                <TabPanel className="!px-0 !py-4" value={"partner"}>
                  <PartnerSignup />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
