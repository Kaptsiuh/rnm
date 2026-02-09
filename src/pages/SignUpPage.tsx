import { Header } from "@/components/Header";
import { SignUp } from "@/components/SignUp";
import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export const SignUpPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div>
          <div className="my-4">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <p>
              Already have an account?
              <Button variant={"link"}>
                <Link to="/login" className="text-xl">
                  Sign In
                </Link>
              </Button>
            </p>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
};
