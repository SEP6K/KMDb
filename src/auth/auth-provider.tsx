import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../utils/firebase";
import { useLocalStorage } from "../utils/use-local-storage";

type User = {
  username: string;
  email: string;
};

type Context = {
  user?: User;
  signUpWithEmailAndPass: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  googleLogin: () => Promise<UserCredential>;
  signInWithEmailAndPass: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

type ContextProps = {
  children: React.ReactNode;
};

const Context = createContext<Context>({} as Context);

const provider = new GoogleAuthProvider();
const appAuth = auth;

export const useAuth = (): Context => useContext(Context);

export const AuthContext: React.FC<ContextProps> = ({ children }) => {
  const { getItem, setItem, removeItem } = useLocalStorage();
  const [user, setUser] = useState<User | undefined>(
    getItem("user") ?? undefined
  );

  useEffect(() => {
    if (user) {
      setItem("user", user);
    } else {
      removeItem("user");
    }
  }, [user]);

  const signUpWithEmailAndPass = async (email: string, password: string) =>
    createUserWithEmailAndPassword(appAuth, email, password).then((user) => {
      if (user.user) {
        setUser({
          email: user.user.email!,
          username: user.user.displayName!,
        });
      }

      return user;
    });

  const googleLogin = async () =>
    await signInWithPopup(auth, provider).then((user) => {
      if (user.user) {
        setUser({
          email: user.user.email!,
          username: user.user.displayName!,
        });
      }

      return user;
    });

  const signInWithEmailAndPass = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      if (user.user) {
        setUser({
          email: user.user.email!,
          username: user.user.displayName!,
        });
      }

      return user;
    });
  };

  const logout = async () =>
    auth.signOut().then(() => {
      removeItem("user");
      setUser(undefined);
    });

  const context: Context = {
    signUpWithEmailAndPass,
    signInWithEmailAndPass,
    googleLogin,
    user,
    logout,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
