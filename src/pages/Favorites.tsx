import { CharacterCard } from "@/components/CharacterCard";
import { Header } from "@/components/Header";
import { Button } from "@/shared/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearFavorites, fetchFavorites } from "@/store/slices/favoritesSlice";
import type { CharacterType } from "@/types/character";
import { useEffect } from "react";

export const Favorites = () => {
  const dispatch = useAppDispatch();
  const { favorites, characters, isLoading, error } = useAppSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites(favorites));
  }, [dispatch, favorites]);

  const clearFavoritesHandler = () => {
    dispatch(clearFavorites());
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {favorites.length > 0 && (
            <Button variant="destructive" onClick={clearFavoritesHandler}>
              Clear Favorites
            </Button>
          )}
        </div>
        {isLoading ? (
          <div className="text-center px-4 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center px-4 py-8">{error}</div>
        ) : favorites.length === 0 ? (
          <h3 className="text-center px-4 py-8">No viewing favorites yet</h3>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters?.map((c: CharacterType) => {
              return <CharacterCard key={c.id} character={c} />;
            })}
          </ul>
        )}
      </main>
    </div>
  );
};
