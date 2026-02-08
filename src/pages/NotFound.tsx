import { Button } from "@/shared/ui/button";
import { Link } from "react-router";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="text-center space-y-6 max-w-2xl">
        <h1 className="text-[250px] md:text-[200px] sm:text-[150px] xs:text-[100px] font-bold leading-none text-primary">
          404
        </h1>
        <h2 className="text-5xl md:text-4xl sm:text-3xl font-semibold uppercase tracking-wider text-foreground">
          Page Not Found
        </h2>
        <div className="pt-6">
          <Button asChild size="lg" className="gap-2">
            <Link to="/">Go to Home page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
