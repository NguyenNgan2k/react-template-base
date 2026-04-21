import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MsgSession, MsgSessionRequest } from "../msgSessionType";

type MsgSessionState = {
  msgSession: MsgSession[];
};

const initialState: MsgSessionState = {
  msgSession: [],
};

export const msgSessionSlice = createSlice({
  name: "msgSession",
  initialState,
  reducers: {
    fetchMsgSessionRequest: (
      state: MsgSessionState,
      action: PayloadAction<MsgSessionRequest>,
    ) => {},
    fetchMsgSessionSuccess: (
      state: MsgSessionState,
      action: PayloadAction<MsgSession[]>,
    ) => {
      state.msgSession = action.payload;
    },
    fetchMsgSessionError: () => {},
  },
});

export const {
  fetchMsgSessionRequest,
  fetchMsgSessionSuccess,
  fetchMsgSessionError,
} = msgSessionSlice.actions;

export default msgSessionSlice.reducer;

export const selectMsgSession = (state: { msgSession: MsgSessionState }) =>
  state.msgSession.msgSession;
