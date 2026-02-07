import type { RootState, AppDispatch } from "./../store";

export type { RootState, AppDispatch };

export type ThunkAPI = {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: string;
};
