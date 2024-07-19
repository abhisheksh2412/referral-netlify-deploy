import axiosInstance from "@/_utils/axiosUtils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

export const GetCustomerDashData = createAsyncThunk(
  "/get/all_data_by_store_id/",
  async (id) => {
    const response = await axiosInstance.get("/get/all_data_by_store_id/" + id);
    return response.data;
  }
);

export const GetFavoriteStores = createAsyncThunk(
  "api/get/favorite-stores",
  async (userid) => {
    const response = await axiosInstance.get("/get/favorite-stores/" + userid);
    return response.data;
  }
);

export const GetFavouriteProducts = createAsyncThunk(
  "/get/favorite-products/",
  async (userid) => {
    const response = await axiosInstance.get(
      "/get/favorite-products/" + userid
    );
    return response.data;
  }
);

export const AddStoreFavorite = createAsyncThunk(
  "/add/favorite-store",
  async (data) => {
    const response = await axiosInstance.post("/add/favorite-store", data);
    return response.data;
  }
);

export const GetAllCardsWithStoreId = createAsyncThunk(
  "/get/card_with_qr_and_active_coupon_data/",
  async (storeId) => {
    const response = await axiosInstance.get(
      "/get/card_with_qr_and_active_coupon_data/" + storeId
    );
    return response.data;
  }
);

export const GetCouponsByStore = createAsyncThunk(
  "/get/coupons/store/",
  async (storeid) => {
    const response = await axiosInstance.get("/get/coupons/store/" + storeid);
    return response.data?.data;
  }
);

export const GetActiveCouponsByStore = createAsyncThunk(
  "api/get/coupons/active",
  async (storeId) => {
    const response = await axiosInstance.get("/get/coupons/active/" + storeId);
    return response.data.data;
  }
);

export const GetInActiveCouponsByStore = createAsyncThunk(
  "/get/coupons/inactive",
  async (storeId) => {
    const response = await axiosInstance.get(
      "/get/coupons/inactive/" + storeId
    );
    return response.data.data;
  }
);

export const ActivateUserCoupon = createAsyncThunk(
  "/user/activate/coupon",
  async ({ storeId, couponId }) => {
    const response = await axiosInstance.post(
      `/user/activate/coupon/${storeId}/${couponId}`
    );
    return response.data;
  }
);

export const GetMoreSectionCounts = createAsyncThunk(
  "/partner/get/count_all_by_partner_id/",
  async (userId) => {
    const response = await axiosInstance.get(
      "/partner/get/count_all_by_partner_id/" + userId
    );
    return response.data;
  }
);

export const GetBestSellerByUserId = createAsyncThunk(
  "/get/partner/best-sellers",
  async (userid) => {
    const response = await axiosInstance.get(
      "/get/partner/best-sellers/" + userid
    );
    return response.data;
  }
);

export const GetRecentProductList = createAsyncThunk(
  "/get/recent-products/",
  async (userId) => {
    const response = await axiosInstance.get("/get/recent-products/" + userId);
    return response.data;
  }
);

export const AddProductAsFavorite = createAsyncThunk(
  "api/add/favorite-product",
  async (data) => {
    const response = await axiosInstance.post("/add/favorite-product", data);
    return response.data;
  }
);

// Get Stores By Customer
export const GetAllStoresByUserID = createAsyncThunk(
  "GetAllCustomerStores",
  async (userid) => {
    const response = await axiosInstance.get(
      "/partner/get/all-stores-by-partner-id/" + userid
    );
    return response.data;
  }
);

export const GetUpdateProfileByCustomerId = createAsyncThunk(
  "update_profile_data_by_customer_id",
  async ({ userid, data }) => {
    const response = await axiosInstance.post(
      "/update_profile_data_by_customer_id/" + userid,
      data
    );
    return response.data;
  }
);

export const GetAllCustomer = createAsyncThunk(
  "/get/all/users/customer",
  async () => {
    const response = await axiosInstance.get("/get/all/users/customer");
    return response.data;
  }
);

const CustomerSlice = createSlice({
  name: "customer",
  initialState: {
    isLoading: false,
    isError: false,
    favouriteStores: [],
    favouritesProducts: [],
    customerCardsByStore: [],
    favoriteProductList: [],
    bestSellersList: [],
    customerList: [],
    StoreList: [],
    moreTabs: [],
    couponsByStore: [],
    isSuccess: false,
    data: null,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetCustomerDashData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(GetCustomerDashData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = action.error.message;
      })
      .addCase(GetCustomerDashData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(GetFavoriteStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetFavoriteStores.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(GetFavoriteStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.favouriteStores = action.payload;
        state.isSuccess = true;
      })
      .addCase(GetFavouriteProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(GetFavouriteProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(GetFavouriteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favouritesProducts = action.payload;
      })
      .addCase(AddStoreFavorite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(AddStoreFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(AddStoreFavorite.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(GetAllCardsWithStoreId.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(GetAllCardsWithStoreId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetAllCardsWithStoreId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.customerCardsByStore = action.payload;
      })
      .addCase(GetCouponsByStore.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetCouponsByStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetCouponsByStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponsByStore = action.payload;
      })
      .addCase(GetActiveCouponsByStore.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetActiveCouponsByStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetActiveCouponsByStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponsByStore = action.payload;
      })
      .addCase(GetInActiveCouponsByStore.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetInActiveCouponsByStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetInActiveCouponsByStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.couponsByStore = action.payload;
      })
      .addCase(ActivateUserCoupon.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(ActivateUserCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(ActivateUserCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(GetMoreSectionCounts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetMoreSectionCounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetMoreSectionCounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.moreTabs = action.payload;
      })
      .addCase(GetBestSellerByUserId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetBestSellerByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetBestSellerByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bestSellersList = action.payload;
      })
      .addCase(GetRecentProductList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetRecentProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetRecentProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.favoriteProductList = action.payload;
      })
      .addCase(AddProductAsFavorite.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(AddProductAsFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(AddProductAsFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(GetAllStoresByUserID.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetAllStoresByUserID.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetAllStoresByUserID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.StoreList = action.payload;
      })
      .addCase(GetUpdateProfileByCustomerId.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetUpdateProfileByCustomerId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetUpdateProfileByCustomerId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(GetAllCustomer.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetAllCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(GetAllCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customerList = action.payload;
      });
  },
});

export const { reset } = CustomerSlice.actions;

export default CustomerSlice.reducer;
