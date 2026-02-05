import { characterApi } from "@/api/characterApi";
import { CharacterCard } from "@/components/CharacterCard";
import { Header } from "@/components/Header";
import { Button } from "@/shared/ui/button";
import type { CharacterType } from "@/types/character";
import { useEffect, useState } from "react";

export const History = () => {
  const [charactersHistory, setCharactersHistory] = useState<CharacterType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getHistory = () => {
    const history = localStorage.getItem("history");
    if (!history) return [];
    return JSON.parse(history);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const history = getHistory();
      try {
        const promises = history.map((id: string) => characterApi.getById(id));
        const result = await Promise.all(promises);
        const characters = result.map((res) => res.data);
        setCharactersHistory(characters);
        setError(null);
      } catch {
        setError("Failed to load history");
      }
    };

    fetchHistory();
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("history");
    setCharactersHistory([]);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          {charactersHistory.length > 0 && (
            <Button variant="destructive" onClick={clearHistory}>
              Clear History
            </Button>
          )}
        </div>
        {error ? (
          <div className="text-center px-4 py-8">{error}</div>
        ) : charactersHistory.length === 0 ? (
          <h3 className="text-center px-4 py-8">No viewing history yet</h3>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {charactersHistory.map((c: CharacterType) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};
