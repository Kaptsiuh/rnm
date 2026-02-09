import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useState, type ChangeEvent } from "react";

type Props = {
  title: string;
  handleClick: (email: string, password: string) => void;
};

export const Form = ({ title, handleClick }: Props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const onClickHandler = () => {
    handleClick(email, pass);
  };

  return (
    <div>
      <div className="flex flex-col gap-6">
        <Input type="email" value={email} onChange={onChangeEmail} placeholder="email" />
        <Input type="password" value={pass} onChange={onChangePass} placeholder="password" />
        <Button onClick={onClickHandler}>{title}</Button>
      </div>
    </div>
  );
};
