import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useState, type ChangeEvent, type KeyboardEvent } from "react";

type Props = {
  onFilterChange?: (filters: { name: string; status: string; gender: string }) => void;
};

export const CharacterFilters = ({ onFilterChange }: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState(" ");
  const [gender, setGender] = useState(" ");

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value.trim();
    if (newValue) {
      setName(newValue);
    }
  };

  const onEnterChangeNameHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onFilterChange({ name, status, gender });
      setName("");
    }
  };

  return (
    <div className="flex gap-5 container mx-auto px-4 pt-8">
      <Input placeholder="Search..." value={name} onChange={changeNameHandler} onKeyDown={onEnterChangeNameHandler} />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full max-w-60">
          <SelectValue placeholder="All Statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value=" ">All Statuses</SelectItem>
            <SelectItem value="alive">Alive</SelectItem>
            <SelectItem value="dead">Dead</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={gender} onValueChange={setGender}>
        <SelectTrigger className="w-full max-w-60">
          <SelectValue placeholder="All Genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value=" ">All Genders</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="genderless">Genderless</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
