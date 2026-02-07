import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useAppDispatch } from "@/store/hooks";
import { updateFilters } from "@/store/slices/characterSlice";
import { type ChangeEvent } from "react";

type Props = {
  filters: {
    name: string;
    status: string;
    gender: string;
  };
  onFilterChange: (newFilters: { name: string; status: string; gender: string }) => void;
};

export const CharacterFilters = ({ filters }: Props) => {
  const dispatch = useAppDispatch();

  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateFilters({ key: "name", value: e.currentTarget.value }));
  };

  const onChangeStatusHandler = (value: string) => {
    dispatch(updateFilters({ key: "status", value }));
  };

  const onChangeGenderHandler = (value: string) => {
    dispatch(updateFilters({ key: "gender", value }));
  };

  return (
    <div className="flex gap-5 container mx-auto px-4 pt-8">
      <Input placeholder="Search..." value={filters.name} onChange={changeNameHandler} />

      <Select value={filters.status} onValueChange={onChangeStatusHandler}>
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

      <Select value={filters.gender} onValueChange={onChangeGenderHandler}>
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
