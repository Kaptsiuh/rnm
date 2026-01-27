import axios from "axios";
import { useEffect, useState } from "react";
import { Header } from "./components/Header";

export type Location = {
  name: string;
  erl: string;
};

export type CharacterStatus = "Alive" | "Dead" | "Unknown";

export type CharacterGender = "Male" | "Female" | "Genderless" | "Unknown";

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
};

function App() {
  const [characterResponse, setCharactersResponse] = useState<CharacterResponse | null>(null);

  useEffect(() => {
    axios.get("https://rickandmortyapi.com/api/character").then((res) => {
      setCharactersResponse(res.data);
    });
  }, []);

  return (
    <div>
      <Header />
      {characterResponse ? (
        characterResponse.results.map((c: Character) => {
          return (
            <div key={c.id}>
              <img src={c.image} alt={c.name} />
              <span>{c.name}</span>
              <span>{c.species}</span>
            </div>
          );
        })
      ) : (
        <div>Sorry... We found nothing.</div>
      )}
    </div>
  );
}

export default App;
