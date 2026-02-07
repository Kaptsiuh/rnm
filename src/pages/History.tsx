import { CharacterCard } from "@/components/CharacterCard";
import { Header } from "@/components/Header";
import { Button } from "@/shared/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearHistory, fetchHistory } from "@/store/slices/historySlice";
import type { CharacterType } from "@/types/character";
import { useEffect } from "react";

export const History = () => {
  const dispatch = useAppDispatch();
  const { history, characters, isLoading, error } = useAppSelector((state) => state.history);

  useEffect(() => {
    dispatch(fetchHistory(history));
  }, [dispatch, history]);

  const clearHistoryHandler = () => {
    dispatch(clearHistory());
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {history.length > 0 && (
            <Button variant="destructive" onClick={clearHistoryHandler}>
              Clear History
            </Button>
          )}
        </div>
        {isLoading ? (
          <div className="text-center px-4 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center px-4 py-8">{error}</div>
        ) : history.length === 0 ? (
          <h3 className="text-center px-4 py-8">No viewing history yet</h3>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {characters?.map((c: CharacterType) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
