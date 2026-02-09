import { Header } from "@/components/Header";
import { Login } from "@/components/SignIn";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export const SignInPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <p>
              Don't have an account?
              <Button variant={"link"}>
                <Link to="/registration" className="text-xl">
                  Sign Up
                </Link>
              </Button>
            </p>
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};
