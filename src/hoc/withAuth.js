"use client";

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RemoveSpaces } from "@/_utils/manageRoute";
import { Spinner } from "@material-tailwind/react";
import { config } from "@/config/config";
import { FindSelfUser } from "@/store/slices/authSlice";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [instruction, setInstruction] = useState("");
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.data);
    const router = useRouter();
    const fetchUser = useCallback(() => {
      dispatch(FindSelfUser());
    }, [dispatch]);

    const token =
      typeof window !== "undefined" && localStorage.getItem(config.TOKEN_KEY);

    useEffect(() => {
      const checkAuth = async () => {
        if (!isAuthenticated) {
          setInstruction("User not authenticated, checking for token");
          if (!token) {
            setInstruction("No token found to authenticate");
            router.push("/login");
          } else {
            setInstruction("Token found, logging in user");
            await fetchUser();
          }
        } else {
          const pathname = location.pathname.split("/");
          if (user?.role && !pathname.includes(RemoveSpaces(user.role))) {
            setInstruction("Wrong path accessing. Redirecting to correct path");
            router.push(`/dashboard/${RemoveSpaces(user.role)}`);
          } else {
            setInstruction("");
            setLoading(false);
          }
        }
      };

      checkAuth();
    }, [isAuthenticated, router, user, token, fetchUser]);

    if (loading) {
      return (
        <div className="w-full h-screen flex flex-col gap-2 items-center justify-center">
          <Spinner className="h-16 w-16" />
          <h4 className="text-center text-gray-600 font-semibold text-sm">
            {instruction}
          </h4>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithAuth;
};

export default withAuth;
