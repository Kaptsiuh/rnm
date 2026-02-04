import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui/card";
import type { CharacterType } from "@/types/character";
import { useNavigate } from "react-router";

type Props = {
  character: CharacterType;
};

export const CharacterCard = ({ character }: Props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(`/character/${character.id}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
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
