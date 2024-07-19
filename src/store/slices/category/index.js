import { popup } from "@/_utils/alerts";
import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  data: null,
  error: null,
  categoryListByUserId: [],
  categoryList: [],
  sigleCategory: {},
  isSuccess: false,
};

const CategorySlice = createSlice({
  name: "category",
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
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    categoryFetchedSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.categoryList = action.payload;
    },
    CategoryByIdSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.sigleCategory = action.payload;
      state.isSuccess = true;
    },
    fetchedCategoryListByUserId: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.categoryListByUserId = action.payload;
    },
  },
});

const {
  failed,
  loading,
  success,
  categoryFetchedSuccess,
  CategoryByIdSuccess,
  fetchedCategoryListByUserId,
} = CategorySlice.actions;

export default CategorySlice.reducer;

export const AddCategory = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/category", data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};

export const DeleteCategory = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/delete/category/" + id);
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};

// Update category
export const UpdateCategory = (id, data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/update/category/" + id, data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};

// Get all categories

export const GetAllCategories = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/categories");
    if (response.status === 200) {
      if (!response.data?.error?.includes("Unauthorized")) {
        dispatch(categoryFetchedSuccess(response.data.data));
      } else {
        popup({ status: "error", message: response?.data?.error });
      }
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};

// find category by id
export const FindCategoryById = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/category/" + id);
    if (response.status === 200) {
      dispatch(CategoryByIdSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};

// Get all the category by partner id

export const GetAllCategoryByPartnerId = (userid) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(
      "/partner/get/all-categories-by-partner-id/" + userid
    );
    if (response.status === 200) {
      dispatch(fetchedCategoryListByUserId(response.data));
    }
  } catch (error) {
    dispatch(
      failed(error.message || error?.message?.data?.message || "unkown error ")
    );
  }
};
