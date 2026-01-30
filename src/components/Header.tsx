import { Button } from "@/shared/ui/button";

export const Header = () => {
  return (
    <div className="sticky flex justify-center border-b bg-background/95 backdrop-blur ">
      <div className="flex h-16 items-center justify-between container mx-auto px-4 py-8">
        <Button variant="link">Rick and Morty</Button>
        <div className="">
          <Button variant="link">Search</Button>
          <Button variant="link">History</Button>
          <Button variant="link">Favorites</Button>
          <Button variant="default">Log In</Button>
          <Button variant="default">Log Out</Button>
        </div>
      </div>
    </div>
  );
};
