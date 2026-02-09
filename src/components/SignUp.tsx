import { useAppDispatch } from "@/store/hooks";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { setUser } from "@/store/slices/userSlice";
import { useNavigate } from "react-router";
import { auth } from "@/firebase";
import { useState } from "react";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredencial = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredencial.user;
      const token = await user.getIdToken();

      dispatch(setUser({ email: user.email, id: user.uid, token }));
      navigate("/");
    } catch {
      setError("Registration error");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <Form title="Sign Up" handleClick={handleRegister} />
    </div>
  );
};
