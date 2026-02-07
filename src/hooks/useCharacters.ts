import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCharacters } from "@/store/slices/characterSlice";
import { useEffect } from "react";

export const useCharacters = () => {
  const dispatch = useAppDispatch();
  const { filters, data, isLoading, error } = useAppSelector((state) => state.character);

  useEffect(() => {
    dispatch(fetchCharacters(filters));
  }, [dispatch, filters]);

  return { data, isLoading, error };
};
