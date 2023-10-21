import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  gameHeight?: number;
}

const initialState: UiState = {
  gameHeight: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setGameHeight(state: UiState, action: PayloadAction<number>) {
        state.gameHeight = action.payload;
    }
  },
});

export const {
    setGameHeight
} = uiSlice.actions;

export default uiSlice.reducer;
