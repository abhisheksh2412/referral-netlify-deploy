import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isPasswordReset: false,
  usersList: [],
  error: null,
  data: null,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = action.payload;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    UpdatedSuccess: (state, action) => {
      state.isSuccess = true;
      state.data = action.payload;
      state.isError = false;
      state.isLoading = false;
    },
    passwordresetSuccess: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isPasswordReset = true;
    },
    fetchedUsersList: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.usersList = action.payload;
    },
  },
});

const {
  failed,
  loading,
  success,
  UpdatedSuccess,
  passwordresetSuccess,
  fetchedUsersList,
} = UserSlice.actions;

export default UserSlice.reducer;

export const UpdateUser = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/user/update", credentials);
    if (response.status === 200) {
      dispatch(UpdatedSuccess(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

export const ResetPassword = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/reset-password", credentials);
    if (response.status === 200) {
      dispatch(passwordresetSuccess());
      popup({ status: "success", message: "Password Reset Successfully" });
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

// Get all the users by the store id
export const GetAllUsersByStoreId = (storeId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/seller/get/all-users-by-store-id/" + storeId
    );
    if (response.status === 200) {
      dispatch(fetchedUsersList(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

// Register card to user
export const RegisterCardToUser = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/seller/register-card-to-user",
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

// Update user Profile

export const UpdateUserProfile = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/user/update", data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

// Get all the normal users

export const GetAllNormalUsers = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/customer/get/normal_users");
    if (response.status === 200) {
      dispatch(fetchedUsersList(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
  }
};

// Reset password by User iD
export const ChangePasswordByUserId = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/set-password", data);
    if (response.status === 200) {
      if (!response.data?.error) {
        dispatch(success(response.data.data));
      } else {
        popup({ status: "error", message: response?.data?.error });
      }
    }
  } catch (error) {
    popup({
      status: "error",
      message:
        error?.response?.data?.message || error?.message || "unknown Error",
    });
    dispatch(
      failed(
        error?.response?.data?.message || error?.message || "unknown Error"
      )
    );
  }
};
