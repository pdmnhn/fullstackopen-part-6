import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newNotification: (state, action) => {
      return action.payload;
    },
    clearNotification: (state, action) => {
      return "";
    },
  },
});

export const { newNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (value, time) => {
  return (dispatch) => {
    dispatch(newNotification(value));
    setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
