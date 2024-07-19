import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  error: null,
  isSuccess: false,
  purchasedCardList: [],
};

const ManagerSlice = createSlice({
  name: "manager",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    success: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    GetPurchasedCard: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.purchasedCardList = action.payload;
    },
  },
});

const { failed, loading, success, GetPurchasedCard } = ManagerSlice.actions;

export default ManagerSlice.reducer;

export const AddManager = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/partner/add/manager",
      credentials
    );
    if (response.status === 200) {
      if (response.data.error) {
        popup({ status: "error", message: response.data.error.message });
      } else {
        dispatch(success(response.data));
      }
    }
  } catch (error) {
    const errorMessage =
      error?.message || error?.message?.data?.message || "Unkown error ";
    Swal.mixin({
      toast: true,
    }).fire({
      icon: "warning",
      text: errorMessage, // Correct option for the message text
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unkown error ")
    );
  }
};

// Get Purchased card by manager id
export const GetPurchasedCardManagerId = (managerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/all-purchased-cards-by-manager-id/" + managerId
    );
    if (response.status === 200) {
      dispatch(GetPurchasedCard(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unkown error ")
    );
  }
};

export const UpdateProfileByManagerId = (userid, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/update_profile_data_by_manager_id/" + userid,
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};
