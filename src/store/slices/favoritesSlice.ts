import { characterApi } from "@/api/characterApi";
import type { CharacterType } from "@/types/character";
import type { ThunkAPI } from "@/types/redux";
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

type FavoritesState = {
  favorites: number[];
  characters: CharacterType[] | null;
  isLoading: boolean;
  error: string | null;
};

const loadFavoritesFromStorage = (): number[] => {
  const savedFavorites = localStorage.getItem("favorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const initialState: FavoritesState = {
  favorites: loadFavoritesFromStorage(),
  characters: null,
  isLoading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk<CharacterType[], number[], ThunkAPI>(
  "favorites/fetchFavorites",
  async (favoritesId: number[], { rejectWithValue }) => {
    try {
      if (favoritesId.length === 0) return [];
      const response = await characterApi.getFavorites(favoritesId);
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch {
      return rejectWithValue("Failed to load favorites characters");
    }
  },
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state: FavoritesState, action: PayloadAction<number>) => {
      const characterId = action.payload;
      const index = state.favorites.indexOf(characterId);

      if (index === -1) {
        state.favorites.push(characterId);
      } else {
        state.favorites.splice(index, 1);
        if (state.characters) {
          state.characters = state.characters.filter((c) => c.id !== characterId);
        }
      }

      try {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      } catch (err) {
        console.error(err);
      }
    },
    clearFavorites: (state: FavoritesState) => {
      state.favorites = [];
      state.characters = null;
      localStorage.removeItem("favorites");
    },
    setFavoritesError: (state: FavoritesState, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, clearFavorites, setFavoritesError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
