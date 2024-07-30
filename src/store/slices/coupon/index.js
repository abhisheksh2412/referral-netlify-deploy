import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  singleCoupon: {},
  couponsList: [],
  managerCoupons: [],
  confirmCoupon: [],
  voucherList: [],
  data: null,
  error: null,
};

const CouponSlice = createSlice({
  name: "coupon",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, error) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccess = false;
      state.error = error.payload;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    SingleCouponFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.singleCoupon = action.payload;
      state.isSuccess = true;
    },
    couponFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.couponsList = action.payload;
    },
    successFetchManagerCoupons: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.managerCoupons = action.payload;
    },
    successFetchConfirmCoupons: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.confirmCoupon = action.payload;
    },
    fetchVouchersSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.voucherList = action.payload;
    },
  },
});

const {
  failed,
  loading,
  success,
  SingleCouponFetchSuccess,
  couponFetchedSuccess,
  successFetchManagerCoupons,
  successFetchConfirmCoupons,
  fetchVouchersSuccess,
} = CouponSlice.actions;

export default CouponSlice.reducer;

// add the coupon
export const AddCoupon = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/coupon", data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Get coupon by id
export const GetCouponById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/coupon/" + id);
    if (response.status === 200) {
      dispatch(SingleCouponFetchSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Delete coupon
export const DeleteCouponById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/delete/coupon/" + id);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Activate Coupon by seller
export const ActivateCouponBySeller = (couponId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.put(
      "/seller/activate/coupon/" + couponId
    );
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const GetAllSellerCoupons = (sellerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/seller/coupons/" + sellerId);
    if (response.status === 200) {
      dispatch(couponFetchedSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
    console.log(error);
  }
};

export const GetManagerCoupons =
  (managerId, status = null) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      let ifStatus = "";
      if (status) {
        ifStatus = `/${status}`;
      }
      const response = await axiosInstance.get(
        "/get/manager/coupons/" + managerId + ifStatus
      );
      if (response.status === 200) {
        dispatch(successFetchManagerCoupons(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "unkown error"
        )
      );
    }
  };
export const GetPartnerCoupons =
  (managerId, status = null) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      let ifStatus = "";
      if (status) {
        ifStatus = `/${status}`;
      }
      const response = await axiosInstance.get(
        "/get/partner/coupons/" + managerId + ifStatus
      );
      if (response.status === 200) {
        dispatch(successFetchManagerCoupons(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "unkown error"
        )
      );
    }
  };

export const GetSellerConfirmCoupons =
  (cardId, sellerId) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.get(
        `/seller/get/confirm_coupons/${cardId}/${sellerId}`
      );
      if (response.status === 200) {
        dispatch(successFetchConfirmCoupons(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "unkown error"
        )
      );
    }
  };

export const GetCustomerCouponsByCard = (cardid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/customer/coupons/" + cardid);
    if (response.status === 200) {
      dispatch(fetchVouchersSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const ConfirmCoupon = (data, couponId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      `/seller/confirm_coupon/${couponId}`,
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};
export const RejectCoupon = (data, couponId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      `/seller/reject_coupon/${couponId}`,
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const AssignCouponCard = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/seller/assign_coupon_to_card",
      data
    );
    if (response.status === 200) {
      if (response.data.status) {
        Swal.mixin({ toast: true }).fire({
          icon: "error",
          text: response?.data?.status,
          showConfirmButton: false,
          timer: 1200,
        });
        dispatch(failed(response.data?.status));
      } else {
        dispatch(success(response.data));
      }
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};
