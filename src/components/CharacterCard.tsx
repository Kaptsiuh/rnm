import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui/card";
import type { CharacterType } from "@/types/character";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  character: CharacterType;
  changeStatus?: () => void;
};

export const CharacterCard = ({ character, changeStatus }: Props) => {
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

  const [isLiked, setIsLiked] = useState(() => {
    return getFavorites().includes(character.id);
  });

  const onClickHandler = () => {
    navigate(`/character/${character.id}`);
  };

  const handleLikeClick = () => {
    let favorites = getFavorites();

    if (isLiked) {
      favorites = favorites.filter((id: number) => id !== character.id);
    } else {
      favorites.push(character.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    setIsLiked(!isLiked);
    if (changeStatus) {
      changeStatus();
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow relative">
      <Heart
        onClick={handleLikeClick}
        size={24}
        className={`absolute top-5 right-5 z-1 cursor-pointer hover:scale-110 ${
          isLiked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-300"
        }`}
      />
      <div className="relative">
        <img src={character.image} alt={character.name} className="size-[92%] m-auto object-cover rounded-xl" />
      </div>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">{character.name}</CardTitle>
          <CardDescription>{character.species}</CardDescription>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Status</span>
          <Badge
            variant={
              character.status === "Alive" ? "default" : character.status === "Dead" ? "destructive" : "secondary"
            }
          >
            {character.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Gender</span>
          <span className="text-sm">{character.gender}</span>
        </div>
        <Button variant={"outline"} className="w-full" onClick={onClickHandler}>
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};
