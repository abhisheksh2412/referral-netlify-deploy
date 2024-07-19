import axiosInstance from "@/_utils/axiosUtils";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isError: false,
  combosList: [],
  combos: [],
  isSuccess: false,
  data: null,
  error: null,
};

const ComboSlice = createSlice({
  name: "combo",
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
      state.isSuccess = true;
      state.data = action.payload;
    },
    comboListFetchSuccess: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.combosList = action.payload;
      state.isSuccess = true;
    },
    comboSuccssFetched: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.combos = action.payload;
      state.isSuccess = true;
    },
  },
});

const { failed, loading, success, comboListFetchSuccess, comboSuccssFetched } =
  ComboSlice.actions;

export default ComboSlice.reducer;

export const AddCombo = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.post("/add/combo", data);
    if (response.status === 200) {
      dispatch(success(response.data.data));
    }
  } catch (error) {
    dispatch(
      failed(
        error?.message?.data?.message || error?.message || "unknown error "
      )
    );
  }
};

// Delete combos

export const DeleteCombos = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.delete("/delete/combo/" + id);
    if (response.status === 200) {
      dispatch(success(response.data));
    }
  } catch (error) {
    dispatch(
      failed(
        error?.message?.data?.message || error?.message || "unknown error "
      )
    );
  }
};

export const AllCombosByPartnerId = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get("/get/combos");
    if (response.status === 200) {
      dispatch(comboListFetchSuccess(response.data));
    }
  } catch (error) {
    dispatch(
      failed(
        error?.message?.data?.message || error?.message || "unknown error "
      )
    );
  }
};

export const GetUserComboByToken = () => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await axiosInstance.get(`/get/combo`);
    if (response.status === 200) {
      dispatch(comboSuccssFetched(response.data?.data));
    }
  } catch (error) {
    dispatch(
      failed(
        error?.message?.data?.message || error?.message || "unknown error "
      )
    );
  }
};
