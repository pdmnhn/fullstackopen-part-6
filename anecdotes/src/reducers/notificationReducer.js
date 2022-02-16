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

let timeoutID = null;

export const setNotification = (value, time) => {
  return (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    dispatch(newNotification(value));
    timeoutID = setTimeout(() => {
      dispatch(clearNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
