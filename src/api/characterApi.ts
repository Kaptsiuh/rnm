import type { CharacterResponse, CharacterType } from "@/types/character";
import axios from "axios";

const baseURL = "https://rickandmortyapi.com/api/character/";

export const characterApi = {
  getAll: (querry: string = "") => {
    return axios.get<CharacterResponse>(`${baseURL}?${querry}`);
  },
  getById: (querry: string = "") => {
    return axios.get<CharacterType>(`${baseURL}${querry}`);
  },
  getFavorites: (favoritesId: number[] = []) => {
    return axios.get<CharacterType[]>(`${baseURL}${favoritesId}`);
  },
};
