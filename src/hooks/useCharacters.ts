import { characterApi } from "@/api/characterApi";
import type { CharacterResponse } from "@/types/character";
import { useEffect, useState } from "react";

type FiltersType = {
  page?: number;
  name?: string;
  status?: string;
  gender?: string;
};

export const useCharacters = (filters: FiltersType) => {
  const [data, setData] = useState<CharacterResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const queryParams = new URLSearchParams();
        if (filters.page && filters.page > 1) {
          queryParams.append("page", filters.page.toString());
        }
        if (filters.name) {
          queryParams.append("name", filters.name);
        }
        if (filters.status && filters.status !== " ") {
          queryParams.append("status", filters.status);
        }
        if (filters.gender && filters.gender !== " ") {
          queryParams.append("gender", filters.gender);
        }
        console.log(queryParams.toString());

        const response = await characterApi.getAll(queryParams.toString());
        setData(response.data);
      } catch {
        setError("Failed to fetch characters");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  return { data, isLoading, error };
};
