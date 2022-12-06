import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "@firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../../utils/firebase";

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
};

type ContextProps = {
  children: React.ReactNode;
};

const Context = createContext<Context>({} as Context);

const provider = new GoogleAuthProvider();
const appAuth = auth;

export const useAuth = (): Context => useContext(Context);

export const AuthContext: React.FC<ContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

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

  const context: Context = { signUpWithEmailAndPass, googleLogin, user };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
