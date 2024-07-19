import axiosInstance from "@/_utils/axiosUtils";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetMenuCafeList = createAsyncThunk(
  "/get/menu_shop_cafe",
  async () => {
    const response = await axiosInstance.get("/get/menu_shop_cafe");
    return response.data;
  }
);

export const CreateMenuShopCafe = createAsyncThunk(
  "/add/menu_shop_cafe",
  async (data) => {
    const response = await axiosInstance.post("/add/menu_shop_cafe", data);
    return response.data;
  }
);

export const DeleteMenuShopCafe = createAsyncThunk(
  "/delete/menu_shop_cafe",
  async (id) => {
    const response = await axiosInstance.delete("/delete/menu_shop_cafe/" + id);
    return response.data;
  }
);

export const UpdateMenuCafe = createAsyncThunk(
  "/update/menu_shop_cafe",
  async ({ id, data }) => {
    const response = await axiosInstance.post(
      "/update/menu_shop_cafe/" + id,
      data
    );
    return response.data;
  }
);

const MenuCafeSlice = createSlice({
  name: "menucafe",
  initialState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: null,
    error: null,
    menuCafeList: [],
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.data = null;
      state.error = null;
      state.menuCafeList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetMenuCafeList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(GetMenuCafeList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.menuCafeList = action.payload;
      })
      .addCase(GetMenuCafeList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.error = action.error.message;
        state.menuCafeList = action.payload;
      })
      .addCase(CreateMenuShopCafe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(CreateMenuShopCafe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(CreateMenuShopCafe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(DeleteMenuShopCafe.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(DeleteMenuShopCafe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.error.message;
      })
      .addCase(DeleteMenuShopCafe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(UpdateMenuCafe.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(UpdateMenuCafe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
        state.isSuccess = false;
      })
      .addCase(UpdateMenuCafe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.data = action.payload;
      });
  },
});

export const { reset } = MenuCafeSlice.actions;

export default MenuCafeSlice.reducer;
