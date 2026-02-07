import { characterApi } from "@/api/characterApi";
import type { CharacterResponse } from "@/types/character";
import type { ThunkAPI } from "@/types/redux";
import { createAsyncThunk, createSlice, type PayloadAction, type WritableDraft } from "@reduxjs/toolkit";

export type FiltersState = {
  name: string;
  status: string;
  gender: string;
  page: number;
};

type CharacterState = {
  filters: FiltersState;
  data: CharacterResponse | null;
  isLoading: boolean;
  error: string | null;
};

const loadFiltersFromStorage = (): Partial<FiltersState> => {
  const saveFilters = localStorage.getItem("characterFilters");
  return saveFilters ? JSON.parse(saveFilters) : {};
};

const initialState: CharacterState = {
  filters: {
    name: "",
    status: "",
    gender: "",
    page: 1,
    ...loadFiltersFromStorage(),
  },
  data: null,
  isLoading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk<CharacterResponse, FiltersState, ThunkAPI>(
  "character/fetchCharacters",
  async (filters: FiltersState, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.page && filters.page > 1) {
        queryParams.append("page", filters.page.toString());
      }
      if (filters.name) {
        queryParams.append("name", filters.name);
      }
      if (filters.status && filters.status.trim()) {
        queryParams.append("status", filters.status);
      }
      if (filters.gender && filters.gender.trim()) {
        queryParams.append("gender", filters.gender);
      }

      const response = await characterApi.getAll(queryParams.toString());
      return response.data;
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const errorWithResponse = err as { response?: { status?: number } };
        if (errorWithResponse.response?.status === 404) {
          return rejectWithValue("No characters found");
        }
      }
      return rejectWithValue("Failed to fetch characters");
    }
  },
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    setFilters: (state: CharacterState, action: PayloadAction<Partial<FiltersState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      localStorage.setItem("characterFilters", JSON.stringify(state.filters));
    },
    updateFilters: <T extends keyof FiltersState>(
      state: WritableDraft<CharacterState>,
      action: PayloadAction<{ key: T; value: FiltersState[T] }>,
    ) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
      if (key !== "page") {
        state.filters.page = 1;
      }
      localStorage.setItem("characterFilters", JSON.stringify(state.filters));
    },
    clearError: (state: CharacterState) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, updateFilters, clearError } = characterSlice.actions;

export default characterSlice.reducer;
