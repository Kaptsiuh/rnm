import { characterApi } from "@/api/characterApi";
import { CharacterProperty } from "@/components/CharacterProperty";
import { Header } from "@/components/Header";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import type { CharacterType } from "@/types/character";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export const Character = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const navigate = useNavigate();

  const getFavorites = () => {
    try {
      const favorites = localStorage.getItem("favorites");
      if (!favorites) return [];
      return JSON.parse(favorites);
    } catch {
      return [];
    }
  };

  const saveHistory = (characterId: number) => {
    const history = localStorage.getItem("history") || "[]";
    const filteredHistory = JSON.parse(history).filter((id: number) => id !== characterId);
    localStorage.setItem("history", JSON.stringify([characterId, ...filteredHistory]));
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await characterApi.getById(id);
        setCharacter(response.data);
        setError(null);
        saveHistory(response.data.id);
        setIsLiked(getFavorites().includes(response.data.id));
      } catch {
        setError(`Character with ID: ${id} not found!`);
      }
    };

    fetchCharacters();
  }, [id]);

  const changeFavoriteStatus = () => {
    if (!character) return;

    try {
      let favorites = getFavorites();
      if (isLiked) {
        favorites = favorites.filter((id: number) => id !== character.id);
      } else {
        favorites.push(character.id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsLiked(!isLiked);
      setError(null);
    } catch {
      setError("Error with updating favorites");
    }
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
