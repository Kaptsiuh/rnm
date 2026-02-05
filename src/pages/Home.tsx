import { CharacterCard } from "@/components/CharacterCard";
import { CharacterFilters } from "@/components/CharacterFilters";
import { Header } from "@/components/Header";
import { Skeleton } from "@/components/Skeleton";
import { useCharacters } from "@/hooks/useCharacters";
import type { CharacterType } from "@/types/character";
import { useState } from "react";

export const Home = () => {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    gender: "",
  });
  const { data, isLoading, error } = useCharacters(filters);

  const skeletonArray = new Array(20);

  const onFilterChange = (newFilters: { name: string; status: string; gender: string }) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <CharacterFilters onFilterChange={onFilterChange} />
        {skeletonArray.map((el, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <CharacterFilters onFilterChange={onFilterChange} />
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <CharacterFilters onFilterChange={onFilterChange} />
      <main className="container mx-auto px-4 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.results.map((c: CharacterType) => {
            return <CharacterCard key={c.id} character={c} />;
          })}
        </ul>
      </main>
    </div>
  );
};
