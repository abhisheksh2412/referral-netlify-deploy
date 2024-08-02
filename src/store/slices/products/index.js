import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  productList: [],
  storeProducts: [],
  singleProduct: {},
  sellerUserProducts: [],
  data: null,
  error: null,
};

const ProductSlice = createSlice({
  name: "product",
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
    productAddSuccess: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = action.payload;
    },
    productsFetchedSuccess: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.productList = action.payload;
    },
    success: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
    },
    SingleProductFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.singleProduct = action.payload;
    },
    fetchedStoreProducts: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.storeProducts = action.payload;
    },
    fetchedSellerUserProducts: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.sellerUserProducts = action.payload;
    },
  },
});

const {
  failed,
  loading,
  productAddSuccess,
  productsFetchedSuccess,
  success,
  fetchedStoreProducts,
  SingleProductFetchedSuccess,
  fetchedSellerUserProducts,
} = ProductSlice.actions;

export default ProductSlice.reducer;

// create the product
export const CreateProduct = (credentials) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/product", credentials);
    if (response.status === 200) {
      dispatch(productAddSuccess(response.data.data));
      console.log(response.data);
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

// get all the products list api
export const GetAllProduct = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/products");
    if (response.status === 200) {
      if (!response?.data?.error) {
        dispatch(productsFetchedSuccess(response.data?.data));
      } else {
        popup({ status: "error", message: response?.data?.error });
      }
    }
  } catch (error) {
    dispatch(failed(error.message));
  }
};

// delete the product

export const DeleteProduct = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/product/delete/" + id);
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

// Get single product by id

export const GetSigleProductById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/product/" + id);
    if (response.status === 200) {
      dispatch(SingleProductFetchedSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Update Product

export const UpdateProductApi = (id, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/update/product/" + id, data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Get all products by partner Id

export const GetAllProductByPartner = (partnerId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/all-products-by-partner-id/" + partnerId
    );
    if (response.status === 200) {
      dispatch(productsFetchedSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

// Get all products by category id
export const GetAllProductsbyCategory = (categoryId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/all-products-by-category-id/" + categoryId
    );
    if (response.status === 200) {
      dispatch(productsFetchedSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const GetProductsByStoreId = (storeId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/store/products/" + storeId);
    if (response.status === 200) {
      dispatch(fetchedStoreProducts(response.data?.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const GetAllProductsAndPoints = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/get/all/products_and_points/" + userid
    );
    if (response.status === 200) {
      dispatch(fetchedSellerUserProducts(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error?.message || error?.message?.data?.message || "unkown error")
    );
  }
};

export const AddProductAndPoints =
  (fromdata, route = null) =>
  async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "/add/product/name/point",
        fromdata
      );
      if (response.status === 200) {
        Swal.mixin({ toast: true }).fire({
          icon: "success",
          text: "product added successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        dispatch(success(response.data));
        route();
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "unkown error"
        )
      );
    }
  };

export const DeleteProductPoints = (productid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete(
      "/seller/delete/products_and_points/" + productid
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

export const UpdateProductsAndPoints =
  (productId, data) => async (dispatch) => {
    dispatch(loading());
    try {
      const response = await axiosInstance.post(
        "/seller/update/products_and_points/" + productId,
        data
      );
      if (response.status === 200) {
        dispatch(success(response.data));
      }
    } catch (error) {
      dispatch(
        failed(
          error?.message || error?.message?.data?.message || "unkown error"
        )
      );
    }
  };
