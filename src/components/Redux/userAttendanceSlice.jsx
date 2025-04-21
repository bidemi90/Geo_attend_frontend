import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch attendance created by a specific user
export const fetchUserAttendance = createAsyncThunk(
  "attendance/fetchUserAttendance",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:1100/user/getUserAttendance/${userId}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user attendance");
      }

      return data.attendance;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isLoading: false,
  userAttendance: [],
  error: null,
};

const userAttendanceSlice = createSlice({
  name: "userAttendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAttendance.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userAttendance = action.payload;
      })
      .addCase(fetchUserAttendance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userAttendanceSlice.reducer;
