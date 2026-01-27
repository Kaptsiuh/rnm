import { Button } from "@/shared/ui/button";

export const Header = () => {
  return (
    <div className="sticky flex justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
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
