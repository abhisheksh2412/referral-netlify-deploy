import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  isActivated: false,
  checkoutData: {},
  orderSuccess: {},
  varifiedUserData: {},
  notifications: [],
  payInvoiceData: {},
  successTransactionData: {},
  lastInvoices: [],
  isVerified: false,
  data: null,
  error: null,
};

const CommonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    resetRedirectUrl: (state) => {
      state.checkoutData = null;
      state.isSuccess = false;
    },
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    mailSended: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    CodeVerified: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isVerified = true;
      state.varifiedUserData = action.payload;
    },
    CheckOutOrder: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.checkoutData = action.payload;
    },
    successOrder: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.orderSuccess = action.payload;
    },
    SuccessUserActivated: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isActivated = true;
      state.data = action.payload;
    },
    SuccessPayInvoiceData: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.payInvoiceData = action.payload;
    },
    successFetchLastInvoices: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.lastInvoices = action.payload;
    },
    successFetchNotifications: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.notifications = action.payload;
    },
    successTransactionData: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.successTransactionData = action.payload;
    },
  },
});

const {
  failed,
  loading,
  CodeVerified,
  mailSended,
  CheckOutOrder,
  successOrder,
  SuccessUserActivated,
  successFetchLastInvoices,
  successFetchNotifications,
  SuccessPayInvoiceData,
  successTransactionData,
} = CommonSlice.actions;
export const { resetRedirectUrl } = CommonSlice.actions;
export default CommonSlice.reducer;

export const SendEmail = (email) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/password/email", {
      email: email,
    });
    if (response.status === 200) {
      dispatch(mailSended(response.data.data));
      popup({ status: "success", message: "Otp sended on email", timer: 2000 });
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const VerifyCode =
  (code, key = null) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      let data;
      if (!key) {
        data = { code: code };
      } else {
        data = { [key]: code };
      }
      const response = await axiosInstance.post("/password/verify-code", data);
      if (response.status === 200) {
        dispatch(CodeVerified(response.data.data));
      }
    } catch (error) {
      popup({ status: "error", message: error?.response?.data?.message });
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      dispatch(failed(errorMessage));
      console.log(error);
    }
  };

// card order checkout

export const CardOrderCheckOut = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/paper_card_order_checkout_web",
      data
    );
    if (response.status === 200) {
      dispatch(CheckOutOrder(response.data?.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};
export const PlasticCardCheckout = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/card_order_checkout_web",
      data
    );
    if (response.status === 200) {
      dispatch(CheckOutOrder(response.data?.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// order succcess

export const OrderSuccess = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/card_order_success",
      data
    );
    if (response.status === 200) {
      dispatch(successOrder(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Customer Activate

export const VerifyOtpAndActivateUser = (data, router) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/customer/activate", data);
    if (response.status === 200) {
      if (response.data?.error) {
        toast.error(response.data?.error);
        return Promise.reject();
      } else {
        dispatch(SuccessUserActivated(response.data));
        router();
        return Promise.resolve();
      }
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
    return Promise.reject();
  }
};

export const StoreAddCheckout = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/add_store_checkout_web",
      data
    );
    if (response.status === 200) {
      dispatch(CheckOutOrder(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};
export const BillPaymentApi = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/pay_invoice_checkout_web",
      data
    );
    if (response.status === 200) {
      dispatch(CheckOutOrder(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    popup({ status: "error", message: errorMessage });
    dispatch(failed(errorMessage));
  }
};
export const PayInvoiceData = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/invoice_by_partner_id"
    );
    if (response.status === 200) {
      dispatch(SuccessPayInvoiceData(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const GetInvoiceData = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/partner/get/invoice_data");
    if (response.status === 200) {
      dispatch(successFetchLastInvoices(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const GetNotificationList = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/send/notification_by_user_id/" + userid
    );
    if (response.status === 200) {
      if (response.data?.data) {
        dispatch(successFetchNotifications(response.data?.data));
      } else {
        dispatch(successFetchNotifications(response.data));
      }
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const SuccessPaymentTransaction =
  (data, credentials, route) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "/stripe/add_store_success",
        data
      );
      if (response.status === 200) {
        const createStore = await axiosInstance.post("/add/store", credentials);
        if (createStore.status === 201) {
          dispatch(successTransactionData(response.data));
          toast.success("created store Successfully");
          route();
        }
      } else {
        toast.error("failed to create invoice and store connect to support");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      dispatch(failed(errorMessage));
      console.log(error);
    }
  };
export const PaperCardSuccessApi =
  (data, cardData, route) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "/stripe/paper_card_order_success",
        data
      );
      if (response.status === 200) {
        const storePaperCard = await axiosInstance.post(
          "/manager/store_paper_card_order",
          cardData
        );
        if (storePaperCard.status === 201) {
          dispatch(successTransactionData(response.data));
          popup({ status: "success", message: "ordered Successfully" });
          route();
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      dispatch(failed(errorMessage));
      toast.error(errorMessage);
      console.log(error);
    }
  };
export const PlasticCardSuccessApi =
  (data, cardFormData, route) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "/stripe/card_order_success",
        data
      );
      if (response.status === 200) {
        const storePlasticCard = await axiosInstance.post(
          "/manager/store_card_order",
          cardFormData
        );
        if (storePlasticCard.status === 201) {
          dispatch(successTransactionData(response.data));
          route();
          popup({ status: "success", message: "Order Successfully" });
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unknown error occurred";
      dispatch(failed(errorMessage));
      toast.error(errorMessage);
      console.log(error);
    }
  };
export const BillPaymentSuccessApi = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/stripe/pay_invoice_success",
      data
    );
    if (response.status === 200) {
      dispatch(successTransactionData(response.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};
