"use client";
import { signIn, signOut, useSession } from "next-auth/react";

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
            <img
              src="/assets/social/facebook-48.png"
              className="w-8 h-8"
              alt="facebooklogo"
            />
          </button>
          <button
            type="button"
            onClick={() => signIn("google")}
            className="p-2 border rounded-full shadow-md hover:shadow transition-shadow"
          >
            <img
              src="/assets/social/google-48.png"
              className="w-8 h-8"
              alt="googleLogo"
            />
          </button>
        </div>
      )}
    </div>
  );
}
