import { useEffect, useState } from "react";
import { Routing } from "./routing/Routing";
import { useAppDispatch } from "./store/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { removeUser, setUser } from "./store/slices/userSlice";
import { auth } from "./firebase";

export function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ email: user.email, id: user.uid }));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  return loading ? (
    <div className="flex flex-col items-center justify-center min-h-screen text-3xl">Loading...</div>
  ) : (
    <Routing />
  );
}
