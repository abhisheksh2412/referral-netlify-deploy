"use client";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RemoveSpaces } from "@/_utils/manageRoute";
import { Spinner } from "@material-tailwind/react";
import { config } from "@/config/config";
import { FindSelfUser } from "@/store/slices/authSlice";

const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.data);
    const router = useRouter();
    const fetchUser = useCallback(() => {
      dispatch(FindSelfUser());
    }, [dispatch]);

    const token = localStorage.getItem(config?.TOKEN_KEY);

    useEffect(() => {
      const pathname = location.pathname.toString().split("/");
      if (!isAuthenticated) {
        if (!token) {
          router.push("/login");
        } else {
          fetchUser();
        }
      } else if (!pathname.includes(RemoveSpaces(user?.role))) {
        router.push(`/dashboard/${RemoveSpaces(user?.role)}`);
      }
    }, [isAuthenticated, router, user, token]);

    if (!isAuthenticated) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner className="h-16 w-16" />
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
