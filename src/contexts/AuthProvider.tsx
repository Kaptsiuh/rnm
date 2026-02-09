import { auth } from "@/firebase";
import { useAppDispatch } from "@/store/hooks";
import { removeUser, setUser } from "@/store/slices/userSlice";
import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUserState(user);
      setLoading(false);

      if (user) {
        try {
          const token = await user.getIdToken();
          dispatch(setUser({ email: user.email, id: user.uid, token }));
        } catch {
          console.error("Error getting token");
          dispatch(setUser({ email: user.email, id: user.uid, token: null }));
        }
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
