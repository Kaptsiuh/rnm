import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

export const Pagination = ({ page, handlePrevPage, handleNextPage }: Props) => {
  return (
    <div className="flex justify-center gap-4 py-4">
      <Button variant="ghost" onClick={handlePrevPage} className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {page}
      <Button variant="ghost" onClick={handleNextPage} className="flex items-center gap-2">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
