export type Location = {
  name: string;
  url: string;
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
