import { Button } from "@/shared/ui/button";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky flex justify-center border-b bg-background/95 backdrop-blur ">
      <div className="flex h-16 items-center justify-between container mx-auto px-4 py-8">
        <Button variant="link" onClick={() => navigate("/")}>
          Rick and Morty
        </Button>
        <div className="">
          <Button variant="link" onClick={() => navigate("/")}>
            Search
          </Button>
          <Button variant="link" onClick={() => navigate("/history")}>
            History
          </Button>
          <Button variant="link" onClick={() => navigate("/favorites")}>
            Favorites
          </Button>
          <Button variant="default" onClick={() => navigate("/login")}>
            Log In
          </Button>
          <Button variant="default">Log Out</Button>
        </div>
      </div>
    </div>
  );
};
