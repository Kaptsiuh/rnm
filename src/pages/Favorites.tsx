import { characterApi } from "@/api/characterApi";
import { CharacterCard } from "@/components/CharacterCard";
import { Header } from "@/components/Header";
import type { CharacterType } from "@/types/character";
import { useEffect, useState } from "react";

export const Favorites = () => {
  const [characters, setCharacters] = useState<CharacterType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getFavorites = () => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return [];
      return JSON.parse(favorites);
    } catch {
      return [];
    }
  };

  const [favoritesId, setFavoritesId] = useState<number[]>(getFavorites);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (favoritesId.length === 0) {
        setError(`Your favorites list is empty`);
        setCharacters([]);
        return;
      }
      try {
        const response = await characterApi.getFavorites(favoritesId);
        setCharacters(Array.isArray(response.data) ? response.data : [response.data]);
        setError(null);
      } catch {
        setError("Failed to load favorites characters");
      }
    };

    fetchCharacters();
  }, [favoritesId]);

  const changeFavoriteStatus = (characterId: number) => {
    try {
      let favorites = getFavorites();

      favorites = favorites.filter((id: number) => id !== characterId);

      localStorage.setItem("favorites", JSON.stringify(favorites));
      setFavoritesId(favorites);
      setCharacters((prev) => (prev ? prev.filter((c) => c.id !== characterId) : null));
    } catch {
      setError("Error with updating favorites");
    }
  };

  if (error) {
    return (
      <div>
        <Header />
        <div className="text-center px-4 py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {characters?.map((c: CharacterType) => {
            return <CharacterCard key={c.id} character={c} changeStatus={() => changeFavoriteStatus(c.id)} />;
          })}
        </ul>
      </main>
    </div>
  );
};
