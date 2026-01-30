import { Header } from "./components/Header";
import { CharacterCard } from "./components/CharacterCard";
import { useCharacters } from "./hooks/useCharacters";
import type { Character } from "./types/character";
import { CharacterFilters } from "./components/CharacterFilters";
import { useState } from "react";

export function App() {
  const [filters, setFilters] = useState({
    name: "",
    status: "",
    gender: "",
  });
  const { data, isLoading, error } = useCharacters(1, filters);

  const onFilterChange = (newFilters: { name: string; status: string; gender: string }) => {
    setFilters(newFilters);
    console.log(filters);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <CharacterFilters />
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <CharacterFilters />
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <CharacterFilters onFilterChange={onFilterChange} />
      <main className="container mx-auto px-4 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data ? (
            data.results.map((c: Character) => {
              return <CharacterCard key={c.id} character={c} />;
            })
          ) : (
            <div>Sorry... We found nothing.</div>
          )}
        </ul>
      </main>
    </div>
  );
}
