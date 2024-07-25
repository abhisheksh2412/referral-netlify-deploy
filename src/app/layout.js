import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import "swiper/swiper-bundle.css";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Head from "next/head";

const inter = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Referral Web",
  description: "Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" lang="pl" />
      </Head>
      <body suppressHydrationWarning className={inter.className}>
        <Toaster />
        <Providers>
          <div id="google_translate_element" style={{ display: "none" }}></div>
          <Suspense fallback={<h5>Loading ...</h5>}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
