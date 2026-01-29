import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "@/shared/ui/card";
import type { Character } from "@/types/character";

type Props = {
  character: Character;
};

export const CharacterCard = ({ character }: Props) => {
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
      </CardContent>
    </Card>
  );
};
