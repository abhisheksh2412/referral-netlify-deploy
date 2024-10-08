import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { config } from "@/config/config";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isLoggedOut: false,
  isSuccess: false,
  isError: false,
  token: null,
  error: null,
  data: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    onLoadingAuthentication: (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.isError = false;
      state.token = null;
    },
    onErrorAuthentication: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = true;
      state.token = null;
      state.error = action.payload;
    },
    onSuccessAuthentication: (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      state.token = action.payload.token;
      state.error = null;
    },

    onSignupLoading: (state) => {
      state.isAuthenticated = false;
      state.isLoading = true;
      state.isError = false;
      state.token = null;
      state.error = null;
      state.isSuccess = false;
    },
    onSignupError: (state, action) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.token = null;
      state.error = action.payload;
    },
    onSignupSuccess: (state, action) => {
      state.data = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.token = action.payload.token;
      state.error = null;
    },
    onSuccessUserUpdate: (state, action) => {
      state.isAuthenticated = true;
      state.data = action.payload;
    },
    onLogoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.token = null;
      state.isLoggedOut = true;
    },
    resetUser: (state) => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  onErrorAuthentication,
  onLoadingAuthentication,
  onSuccessAuthentication,
  onSignupError,
  onSignupLoading,
  onSignupSuccess,
  onLogoutSuccess,
  onSuccessUserUpdate,
  resetUser,
} = AuthSlice.actions;

export default AuthSlice.reducer;

// Login user

export const LoginUser = (credentials) => async (dispatch) => {
  dispatch(onLoadingAuthentication());
  try {
    const credentialsQuery = new URLSearchParams(credentials).toString();
    const response = await axios.post(
      `${config.BASE_URL}/login?${credentialsQuery}`
    );

    if (response.status === 200) {
      if (!response?.data?.message?.includes("invaild")) {
        const token = response.data.data.token;
        setToken({ token: token, userId: response.data.data?.id });
        dispatch(onSuccessAuthentication(response?.data?.data));
        await popup({ status: "success", message: "Logged in Successfully" });
      } else {
        popup({
          status: "error",
          message: response.data?.message,
          timer: 1500,
        });
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(onErrorAuthentication(error.message));
  }
};

export const RegisterPartner = (credentials, otppopup) => async (dispatch) => {
  dispatch(onSignupLoading());

  try {
    const response = await axios.post(
      `${config.BASE_URL}/partner/register`,
      credentials
    );

    if (response.status >= 200 && response.status < 300) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      otppopup();
      setToken({ token: response.data.token, userId: response.data.data?.id });
      dispatch(onSignupSuccess(response.data.data));
    } else {
      toast.error("Unexpected response status.");
      dispatch(onSignupError("Unexpected response status."));
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.response?.data?.error?.message ||
      error?.message ||
      "Unknown error occurred";

    toast.error(errorMessage);
    dispatch(onSignupError(errorMessage));
  }
};

export const RegisterNormalUser = (credentials) => async (dispatch) => {
  dispatch(onSignupLoading());
  try {
    const response = await axios.post(
      config.BASE_URL + "/customer/register",
      credentials
    );
    if (response.status === 200) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered Successfully",
        showConfirmButton: false,
        timer: 1000,
      });
      setToken({ token: token, userId: response.data.data?.id });
      dispatch(onSignupSuccess(response.data.data));
    }
  } catch (error) {
    console.error(error.message);
    dispatch(onSignupError(error.message));
  }
};

export const LogoutUser = () => async (dispatch) => {
  dispatch(onLoadingAuthentication());

  try {
    const response = await axiosInstance.post("/logout");
    if (response.status === 200) {
      await removeToken(config.TOKEN_KEY);
      dispatch(onLogoutSuccess());
      return Promise.resolve();
    } else {
      throw new Error("failed to Logout");
    }
  } catch (error) {
    console.log(error);
    dispatch(onErrorAuthentication(error.message));
    return Promise.reject();
  }
};

export const FindSelfUser = () => async (dispatch) => {
  try {
    const userKey = getToken(config.USER_KEY);
    const response = await axiosInstance.get(
      "/get/user_profile_data_by_customer_id/" + userKey
    );
    if (response.status === 200) {
      dispatch(onSuccessUserUpdate(response.data.data));
    }
  } catch (error) {
    dispatch(onErrorAuthentication(error.message));
  }
};

const setToken = ({ token, userId }) => {
  typeof window !== "undefined"
    ? window.localStorage.setItem(config?.TOKEN_KEY, token)
    : "";
  typeof window !== "undefined"
    ? window.localStorage.setItem(config?.USER_KEY, userId)
    : "";
};

const getToken = (key) => {
  return typeof window !== "undefined" ? window.localStorage.getItem(key) : "";
};

const removeToken = (key) => {
  return typeof window !== "undefined"
    ? window.localStorage.removeItem(key)
    : "";
};
