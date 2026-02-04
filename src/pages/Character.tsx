import { characterApi } from "@/api/characterApi";
import { CharacterProperty } from "@/components/CharacterProperty";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/shared/ui/card";
import type { CharacterType } from "@/types/character";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const Character = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<CharacterType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await characterApi.getById(id);
        setCharacter(response.data);
        setError(null);
      } catch (error) {
        setError(`Character with ID: ${id} not found!`);
        console.error(error);
      }
    };

    fetchCharacters();
  }, [id]);

  if (error || !character) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="text-red-600 text-center px-4 py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Card className="container mx-auto my-8 py-0 grid lg:grid-cols-2 gap-10 bg-fuchsia-200">
        <img src={character.image} alt={character.name} className="w-full rounded-lg m-8" />

        <CardContent className="w-full rounded-lg m-8 flex flex-col gap-4">
          <CharacterProperty title="Name" value={character.name} />
          <CharacterProperty title="Status" value={character.status} />
          <CharacterProperty title="Species" value={character.species} />
          <CharacterProperty title="Gender" value={character.gender} />
          <CharacterProperty title="Location" value={character.location.name} />
          <CharacterProperty title="Origin" value={character.origin.name} />
        </CardContent>
      </Card>
    </div>
  );
};
