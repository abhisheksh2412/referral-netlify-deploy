import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  sendMessageUserList: [],
  usersBirthdayList: [],
  cardByUser: {},
  orderList: [],
  data: null,
  error: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    failed: (state, error) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = error.payload;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    OrdersFetchedSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = true;
      state.orderList = action.payload;
    },
    birthdayStores: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.stores = action.payload;
    },
    storeBirthdayList: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.storesBirthday = action.payload;
    },
    fetchedSendMessageListSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.sendMessageUserList = action.payload;
    },
    fetchedUsersBirthdayListSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.usersBirthdayList = action.payload;
    },
    fetchedCardByUserId: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.cardByUser = action.payload;
    },
  },
});

const {
  failed,
  loading,
  success,
  OrdersFetchedSuccess,
  fetchedUsersBirthdayListSuccess,
  birthdayStores,
  fetchedSendMessageListSuccess,
  storeBirthdayList,
  fetchedCardByUserId,
} = OrderSlice.actions;

export default OrderSlice.reducer;

export const FetchAllSellerOrders = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/seller/get/all_orders_by_seller_id"
    );
    if (response.status === 200) {
      dispatch(OrdersFetchedSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const AddStoreBirthdayData =
  (data, route = null) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post("add/store/birthday", data);
      if (response.status === 200) {
        if (response.data?.errors) {
          for (let value of Object.values(response.data?.errors)) {
            toast.error(value);
          }
          dispatch(failed(response.data));
        } else {
          dispatch(success(response.data));
          toast.success("Store birthday Added");
          route();
        }
      } else {
        dispatch(failed(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "Unknown error"
        )
      );
      toast.error(
        error?.message || error?.message?.data?.message || "Unknown error"
      );
    }
  };

export const FetchStoreForBirthday = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/stores_for_store_birthday");
    if (response.status === 200) {
      dispatch(birthdayStores(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const FetchStoreBirthdayList = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/store/birthday/list");
    if (response.status === 200) {
      dispatch(storeBirthdayList(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const DeleteStoreBirthday = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/delete/store/birthday/" + id);
    if (response.status === 200) {
      dispatch(success(response.data.data));
      popup({ status: "success", message: "Successfuly deleted" });
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const UpdateStoreBirthdayData =
  (data, id, route) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "update/store/birthday/" + id,
        data
      );

      if (response.status === 200) {
        if (response.data.errors) {
          for (let value of Object.values(response.data.errors)) {
            toast.error(value);
          }
          dispatch(failed(response.data));
        } else {
          dispatch(success(response.data));
          toast.success("Updated Successfully");
          route();
        }
      } else {
        dispatch(failed(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "Unknown error"
        )
      );
    }
  };

export const GetSendMessageList = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/user/send_message/list");
    if (response.status === 200) {
      dispatch(fetchedSendMessageListSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const DeleteSendMessage = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete(
      "/delete/user/send_message/" + id
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

export const SendMessage = (itemid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/user/message/send/" + itemid);
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const AddUserSendMessage = (data) => async (dispatch) => {
  dispatch(loading());
  for (const value of Object.values(data)) {
    console.log(value);
  }
  try {
    const response = await axiosInstance.post("/add/user/send_message", data, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure this header is set
      },
    });
    if (response.status === 200) {
      if (response.data?.success === false) {
        popup({ status: "error", message: response.data?.message });
      } else {
        dispatch(success(response.data));
      }
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const UpdateUserSendMessage = (data, itemid) => async (dispatch) => {
  dispatch(loading());

  try {
    const response = await axiosInstance.post(
      "/update/user/send_message/" + itemid,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure this header is set
        },
      }
    );
    if (response.status === 200) {
      if (response.data?.success === false) {
        popup({ status: "error", message: response.data?.message });
      } else {
        dispatch(success(response.data));
      }
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const GetUserBirthdayList = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/user/birthday/list");
    if (response.status === 200) {
      dispatch(fetchedUsersBirthdayListSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const SendUserBirthdayNotification = (itemid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/user/birthday/send/" + itemid);
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const DeleteUserBirthday = (itemid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete(
      "/delete/user/birthday/" + itemid
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

export const CardGetByUserId = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/points/card_data_by_user_id/" + userid
    );
    if (response.status === 200) {
      dispatch(fetchedCardByUserId(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const AddUserBirthday = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/user/birthday", data);
    if (response.status === 200) {
      dispatch(success());
    }
  } catch (error) {
    const errorMessage =
      error?.message || error?.message?.data?.message || "Unknown error";
    popup({ status: "error", message: errorMessage });
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};

export const UpdateUserBirthday = (data, itemid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/update/user/birthday/" + itemid,
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message || error?.message?.data?.message || "Unknown error";
    popup({ status: "error", message: errorMessage });
    dispatch(
      failed(error?.message || error?.message?.data?.message || "Unknown error")
    );
  }
};
