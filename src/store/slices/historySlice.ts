import { characterApi } from "@/api/characterApi";
import type { CharacterType } from "@/types/character";
import type { ThunkAPI } from "@/types/redux";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryState = {
  history: number[];
  characters: CharacterType[] | null;
  isLoading: boolean;
  error: string | null;
};

const loadHistoryFromStorage = (): number[] => {
  const savedHistory = localStorage.getItem("history");
  return savedHistory ? JSON.parse(savedHistory) : [];
};

const initialState: HistoryState = {
  history: loadHistoryFromStorage(),
  characters: null,
  isLoading: false,
  error: null,
};

export const fetchHistory = createAsyncThunk<CharacterType[], number[], ThunkAPI>(
  "history/fetchHistory",
  async (historyId: number[], { rejectWithValue }) => {
    try {
      if (historyId.length === 0) return [];
      const promises = historyId.map((id) => characterApi.getById(id.toString()));
      const results = await Promise.all(promises);
      return results.map((res) => res.data);
    } catch {
      return rejectWithValue("Failed to load history");
    }
  },
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state: HistoryState, action: PayloadAction<number>) => {
      const characterId = action.payload;
      const filteredHistory = state.history.filter((id) => id !== characterId);
      state.history = [characterId, ...filteredHistory];
      localStorage.setItem("history", JSON.stringify(state.history));
    },
    clearHistory: (state: HistoryState) => {
      state.history = [];
      state.characters = null;
      localStorage.removeItem("history");
    },
    setHistoryError: (state: HistoryState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToHistory, clearHistory, setHistoryError } = historySlice.actions;
export default historySlice.reducer;
