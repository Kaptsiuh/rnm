import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilters } from "@/components/CharacterFilters";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/Skeleton";
import { useCharacters } from "@/hooks/useCharacters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/store/slices/characterSlice";
import type { CharacterType } from "@/types/character";
import { useCallback } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { filters, data, isLoading, error } = useAppSelector((state) => state.character);

  useCharacters();

  const onFilterChange = useCallback(
    (newFilters: { name: string; status: string; gender: string }) => {
      dispatch(setFilters({ ...newFilters, page: 1 }));
    },
    [dispatch],
  );

  const handleNextPage = () => {
    if (data?.info?.next) {
      dispatch(setFilters({ ...filters, page: filters.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (data?.info?.prev) {
      dispatch(setFilters({ ...filters, page: filters.page - 1 }));
    }
  };

  const skeletonArray = new Array(data?.results.length);

  return (
    <div className="min-h-screen">
      <Header />
      <CharacterFilters filters={filters} onFilterChange={onFilterChange} />
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <>
            {skeletonArray.map((_, index) => (
              <Skeleton key={index} />
            ))}
          </>
        ) : error ? (
          <div className="text-center px-4 py-8">{error}</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.results.map((c: CharacterType) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </ul>
        )}
        <Pagination page={filters.page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
      </main>
    </div>
  );
};
