import { characterApi } from "@/api/characterApi";
import type { CharacterResponse } from "@/types/character";
import { useEffect, useState } from "react";

export const useCharacters = (page = 1) => {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await characterApi.getAll(page);
        setData(response.data);
      } catch (error) {
        setError("Failed to fetch characters");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return { data, isLoading, error };
};
