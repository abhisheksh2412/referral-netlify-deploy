import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  error: null,
  singleStore: {},
  customerStores: [],
  stores: [],
  popularStores: [],
  sellerStores: [],
  bestSellers: [],
  cards: [],
  data: null,
  orderTotal: {},
  sellers: [],
  managers: [],
};

const SellerSlice = createSlice({
  name: "seller",
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
    },
    sellerAddedSuccess: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    storeCreatedSuccess: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    StoreGetSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.stores = action.payload;
    },
    sellerFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.sellers = action.payload;
    },
    managersFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.managers = action.payload;
    },
    singleStoreSuccessFetched: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.singleStore = action.payload;
    },
    CardOrderTotal: (state, action) => {
      state.orderTotal = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    cardsFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.cards = action.payload;
    },
    fetchedPopularStores: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.popularStores = action.payload;
    },
    fetchBestSellersSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.bestSellers = action.payload;
    },
    fetchedCustomerStoresSucess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.customerStores = action.payload;
    },
    fetchedSellerStoresById: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.sellerStores = action.payload;
    },
  },
});

const {
  failed,
  loading,
  success,
  sellerAddedSuccess,
  storeCreatedSuccess,
  StoreGetSuccess,
  sellerFetchedSuccess,
  managersFetchedSuccess,
  singleStoreSuccessFetched,
  fetchedCustomerStoresSucess,
  CardOrderTotal,
  cardsFetchSuccess,
  fetchedSellerStoresById,
  fetchBestSellersSuccess,
  fetchedPopularStores,
} = SellerSlice.actions;

export default SellerSlice.reducer;

export const AddSeller = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/partner/add/seller",
      credentials
    );
    if (response.status === 200) {
      dispatch(sellerAddedSuccess(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    Swal.mixin({
      toast: true,
    }).fire({
      icon: "warning",
      text: errorMessage, // Correct option for the message text
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const CreateStore = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/store", credentials);
    if (response.status === 200) {
      if (response.data.error) {
        popup({ status: "error", message: response.data?.error });
      } else {
        dispatch(storeCreatedSuccess(response.data.data));
      }
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    popup({ status: "error", message: errorMessage, timer: 1500 });
  }
};

export const GetStores = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/stores");
    if (response.status === 200) {
      if (!response?.data?.error) {
        dispatch(StoreGetSuccess(response.data));
      } else {
        popup({ status: "warning", message: response.data?.error });
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

//  partner get seller
export const PartnerGetSeller = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/partner/get/seller");
    if (response.status === 200) {
      if (!response?.data?.error) {
        dispatch(sellerFetchedSuccess(response.data));
      } else {
        popup({ status: "warning", message: response.data?.error });
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

export const PartnerGetManager = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/partner/get/manager");
    if (response.status === 200) {
      if (!response?.data?.error) {
        dispatch(managersFetchedSuccess(response.data));
      } else {
        popup({ status: "warning", message: response.data?.error });
      }
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Delete store

export const DeleteStore = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/store/delete/" + id);
    if (response.status === 200) {
      dispatch();
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Udpate the store

export const UpdateStore = (id, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/update/store/" + id, data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// add best seller
export const AddBestSeller = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/best-offer", data);
    if (response.status === 200) {
      dispatch(success(response?.data?.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// delete best seller
export const DeleteBestSeller = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/delete/best-offer/" + id);
    if (response.status === 200) {
      dispatch(success(response?.data?.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get Store by chategory ID

export const GetStoreByChategoryId = (id) => async (dispatch) => {
  try {
    dispatch(loading());
    const response = await axiosInstance.get("/get/category-stores/" + id);
    if (response.status === 200) {
      dispatch(StoreGetSuccess(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Add reward points seller

export const AddRewardPointsSeller = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/seller/add/points", data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Delete reward points by seller

export const DeleteRewardPointBySeller = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/seller/delete/point/" + id);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// update Seller Points
export const UpdateSellerPoints = (id, data, params) => async (dispatch) => {
  dispatch(loading());
  try {
    let query = "";
    if (params) {
      query = "?" + new URLSearchParams(params).toString();
    }
    const response = await axiosInstance.put(
      `/seller/update/point/${id}` + query,
      data
    );
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get Store By Id

export const GetStoreById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/store/" + id);
    if (response.status === 200) {
      dispatch(singleStoreSuccessFetched(response?.data?.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get Seller Stores

export const GetSellerStores = (sellerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/seller-stores/" + sellerId);
    if (response.status === 200) {
      dispatch(StoreGetSuccess(response.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

export const GetSellerStorebyId = (sellerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/seller-stores/" + sellerId);
    if (response.status === 200) {
      dispatch(fetchedSellerStoresById(response.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get Best seller
export const GetBestSeller = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/best-sellers");
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get Store by store id

export const GetStoreByStoreId = (storeId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/store/" + storeId);
    if (response.status === 200) {
      dispatch(singleStoreSuccessFetched(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Seller Get Card Order Total
export const GetCardOrderTotal = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/manager/get/card_order_total",
      data
    );
    if (response.status === 200) {
      dispatch(CardOrderTotal(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// Get all cards by store id

export const GetAllCardsByStoreId = (storeId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/seller/get/all-cards-by-store-id/" + storeId
    );
    if (response.status === 200) {
      dispatch(cardsFetchSuccess(response.data.data));
    }
  } catch (error) {
    const errorMessage =
      error?.message?.data?.message ||
      error.message ||
      "An unknown error occurred";
    dispatch(failed(errorMessage));
    console.log(error);
  }
};

// get all cards by user id

export const GetAllCardsByUserId = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/seller/get/assigned_cards/" + userid
    );
    if (response.status === 200) {
      if (!response?.data?.error?.includes("Unauthorized")) {
        dispatch(cardsFetchSuccess(response.data.data));
      } else {
        popup({ status: "warning", message: response?.data?.error });
      }
    }
  } catch (error) {
    console.log(error);
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const DeleteAssignedCards = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete(
      "api/seller/delete/assign_card/" + id
    );
    if (response.status === 200) {
      dispatch(success());
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const SendInvitation = (formdata) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/seller/invite_customer_by_email",
      formdata
    );
    if (response.status === 200) {
      popup({ status: "success", message: "Invitation Sent Successfully" });
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const GetPopularStores = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/popular_stores");
    if (response.status === 200) {
      dispatch(fetchedPopularStores(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

// Get All Best Seller and By token

export const GetBestSellerByToken = (managerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/best-offers/" + managerId);
    if (response.status === 200) {
      dispatch(fetchBestSellersSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const GetAllCustomerStores = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/recent-stores/" + userid);
    if (response.status === 200) {
      dispatch(fetchedCustomerStoresSucess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const GetStoresByCategoryId = (categoryId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/all-stores-by-category-id/" + categoryId
    );
    if (response.status === 200) {
      dispatch(fetchedCustomerStoresSucess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};
export const GetallStoresByUserId = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/all-stores-by-partner-id/" + userid
    );
    if (response.status === 200) {
      dispatch(fetchedCustomerStoresSucess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unknown error")
    );
  }
};

export const UpdateProfileBySellerId = (userid, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post(
      "/update_profile_data_by_seller_id/" + userid,
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
