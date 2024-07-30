"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SocialAuthentication({ text }) {
  const { data: session } = useSession();
  return (
    <div className="w-full text-center flex flex-col items-center p-5">
      <div className="flex items-center w-2/3 justify-between gap-3">
        <hr className="h-1 w-full" />
        <h6 className="text-nowrap text-sm">{text}</h6>
        <hr className="h-1 w-full" />
      </div>
      {!session && (
        <div className="flex items-center justify-center gap-4 p-5">
          {/* Google login button */}
          <button
            type="button"
            onClick={() => signIn("facebook")}
            className="p-2 border rounded-full shadow-md hover:shadow transition-shadow"
          >
         
            <Image
             src="/assets/social/facebook-48.png"
              width={500}
              height={500}
               alt="facebooklogo"
               className="w-8 h-8"
            />
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="p-2 border rounded-full shadow-md hover:shadow transition-shadow"
          >
            <Image
              src="/assets/social/google-48.png"
              width={500}
              height={500}
              alt="googleLogo"
              className="w-8 h-8"
            />
          </button>
        </div>
      )}
    </div>
  );
}
