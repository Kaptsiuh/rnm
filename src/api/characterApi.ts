import type { CharacterResponse } from "@/types/character";
import axios from "axios";

export const characterApi = {
  getAll: (page = 1) => {
    return axios.get<CharacterResponse>(`https://rickandmortyapi.com/api/character?page=${page}`);
  },
};
