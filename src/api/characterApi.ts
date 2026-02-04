import type { CharacterResponse, CharacterType } from "@/types/character";
import axios from "axios";

const baseURL = "https://rickandmortyapi.com/api/character/";

export const characterApi = {
  getAll: (querry = "") => {
    return axios.get<CharacterResponse>(`${baseURL}${querry}`);
  },
  getById: (querry = "") => {
    return axios.get<CharacterType>(`${baseURL}${querry}`);
  },
};
