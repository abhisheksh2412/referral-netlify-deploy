import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  bestSellerList: [],
  maxPointSetting: {},
  invoiceData: [],
  data: null,
  error: null,
};

const PartnerSlice = createSlice({
  name: "partner",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, error) => {
      state.isLoading = false;
      state.isError = true;
      state.error = error.payload;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      state.isSuccess = true;
      state.error = null;
    },
    bestSellerFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.bestSellerList = action.payload;
      state.isSuccess = true;
    },
    fetchedMaxPointSetting: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.maxPointSetting = action.payload;
      state.isSuccess = true;
    },
    fetchedInvoiceData: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.invoiceData = action.payload;
      state.isSuccess = true;
    },
  },
});

const {
  failed,
  loading,
  success,
  bestSellerFetchedSuccess,
  fetchedMaxPointSetting,
  fetchedInvoiceData,
} = PartnerSlice.actions;

export default PartnerSlice.reducer;

// Get partner by id
export const GetPartner = (partnerid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/partner/" + partnerid);
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

// Get count of all by the PartnerId

export const GetAllCountByPartnerId = (partnerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/count_all_by_partner_id/" + partnerId
    );
    if (response.status === 200) {
      //   dispatch();
      console.log(response.data.data);
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

// Get partner best seller

export const GetPartnerBestSeller = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/partner/best-sellers/" + id);
    if (response.status === 200) {
      dispatch(bestSellerFetchedSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const GetMaxpointByToken = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/partner_seller_settings"
    );
    if (response.status === 200) {
      dispatch(fetchedMaxPointSetting(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const SetMaxpointSetting = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/partner/add/partner_seller_settings",
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const GetInvoiceData = (from, to) => async (dispatch) => {
  dispatch(loading());
  try {
    let data = "";
    if (from && to) {
      data = `/${from}/${to}`;
    } else if (from && !to) {
      data = `/${from}`;
    } else {
      data = "";
    }
    const response = await axiosInstance.get(
      `/partner/get/invoice_data${data}`
    );
    if (response.status === 200) {
      dispatch(fetchedInvoiceData(response.data?.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const VerifyManager = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/partner/assign/store", data);
    if (response.status === 200) {
      if (response.data.error) {
        popup({ status: "error", message: response.data.error });
      } else {
        dispatch(success(response.data));
        popup({ status: "success", message: "Verified user Successfully" });
      }
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const UpdateProfileByPartnerId = (userid, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/update_profile_data_by_partner_id/" + userid,
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
