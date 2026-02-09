import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilters } from "@/components/CharacterFilters";
import { Header } from "@/components/Header";
import { Pagination } from "@/components/Pagination";
import { Skeleton } from "@/components/Skeleton";
import { useAuth } from "@/hooks/use-auth";
import { useCharacters } from "@/hooks/useCharacters";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setFilters } from "@/store/slices/characterSlice";
// import { removeUser } from "@/store/slices/userSlice";
import type { CharacterType } from "@/types/character";
import { useCallback } from "react";
// import { Navigate } from "react-router";
import nameImg from "./../assets/rick.png";

export const Home = () => {
  const { isAuth } = useAuth();

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

  return isAuth ? (
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
  ) : (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-3xl">
        <img src={nameImg} alt="rick and morty" />
        <p> There you can see all of the characters that appear in the Rick and Morty franchise.</p>
        <p> Start from search.</p>
      </div>
    </div>
  );

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
