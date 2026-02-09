import { useAppDispatch } from "@/store/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "./Form";
import { useNavigate } from "react-router";
import { setUser } from "@/store/slices/userSlice";
import { auth } from "@/firebase";
import { useState } from "react";

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      dispatch(setUser({ email: user.email, id: user.uid, token }));
      navigate("/");
    } catch {
      setError("Loggin error");
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <Form title="Sign In" handleClick={handleLogin} />
    </div>
  );
};
