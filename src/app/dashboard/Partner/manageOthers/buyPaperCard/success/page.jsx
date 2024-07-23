"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();

  const parms = useSearchParams();
  const sessionId = parms.get("session_id");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionId) {
        const data = {
          sessionId: sessionId,
          status: "success",
        };
        localStorage.setItem(
          "store_payment",
          encodeURIComponent(JSON.stringify(data))
        );
        window.close();
      }
    }
  }, [sessionId]);

  return <div>Hello user{sessionId}</div>;
}
