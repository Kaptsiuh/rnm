import { characterApi } from "@/api/characterApi";
import { CharacterProperty } from "@/components/CharacterProperty";
import { Header } from "@/components/Header";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFavorite } from "@/store/slices/favoritesSlice";
import { addToHistory } from "@/store/slices/historySlice";
import type { CharacterType } from "@/types/character";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const Character = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const isLiked = favorites.includes(character?.id || 0);

  const navigate = useNavigate();

  useEffect(() => {
    const featchCharacter = async () => {
      try {
        const response = await characterApi.getById(id);
        const characterData = response.data;
        setCharacter(characterData);
        setError(null);

        dispatch(addToHistory(characterData.id));
      } catch {
        setError(`Character with ID: ${id} not found!`);
      }
    };

    featchCharacter();
  }, [id, dispatch]);

  const changeFavoriteStatus = () => {
    if (!character) return;
    dispatch(toggleFavorite(character.id));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center justify-between mb-8">
          Back
        </Button>
        {error ? (
          <div className="text-center px-4 py-8">{error}</div>
        ) : !character ? (
          <h3 className="text-center px-4 py-8">No viewing character</h3>
        ) : (
          <Card className="container mx-auto py-0 grid lg:grid-cols-2 gap-10 bg-fuchsia-200">
            <img src={character.image} alt={character.name} className="w-full rounded-lg m-8" />
            <CardContent className="w-full rounded-lg m-8 flex flex-col gap-4 relative">
              <CharacterProperty title="Name" value={character.name} />
              <CharacterProperty title="Status" value={character.status} />
              <CharacterProperty title="Species" value={character.species} />
              <CharacterProperty title="Gender" value={character.gender} />
              <CharacterProperty title="Location" value={character.location.name} />
              <CharacterProperty title="Origin" value={character.origin.name} />
              <Heart
                onClick={changeFavoriteStatus}
                size={100}
                className={`absolute right-25 z-1 cursor-pointer hover:scale-110 ${
                  isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-300"
                }`}
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};
