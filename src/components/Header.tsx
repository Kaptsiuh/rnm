import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/shared/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { removeUser } from "@/store/slices/userSlice";
import { useNavigate } from "react-router";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const dispatch = useAppDispatch();

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
          {isAuth ? (
            <Button variant="default" onClick={() => dispatch(removeUser())}>
              Sign Out
            </Button>
          ) : (
            <Button variant="default" onClick={() => navigate("/login")}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
