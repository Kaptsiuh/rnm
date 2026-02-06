import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilters } from "@/components/CharacterFilters";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/Skeleton";
import { useCharacters } from "@/hooks/useCharacters";
import type { CharacterType } from "@/types/character";
import { useCallback, useState } from "react";

export const Home = () => {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    gender: "",
    page: 1,
  });

  const { data, isLoading, error } = useCharacters(filters);

  const skeletonArray = new Array(data?.results.length);

  const onFilterChange = useCallback((newFilters: { name: string; status: string; gender: string }) => {
    setFilters(() => ({ ...newFilters, page: 1 }));
  }, []);

  const handleNextPage = () => {
    if (data?.info.next) {
      setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (data?.info.prev) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

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
            {data?.results.map((c: CharacterType) => {
              return <CharacterCard key={c.id} character={c} />;
            })}
          </ul>
        )}
        <Pagination page={filters.page} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} />
      </main>
    </div>
  );
};
