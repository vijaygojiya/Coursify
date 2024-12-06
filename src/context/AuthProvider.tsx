import {fireAuth} from '@/services/firebase';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AUTH_CONTEXT_ERROR =
  'Authentication context not found. Have your wrapped your components with AuthContext.Consumer?';

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  logOut: () => void;
}>({
  isLoggedIn: false,
  logOut: () => {
    throw new Error(AUTH_CONTEXT_ERROR);
  },
});

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(false);
  useEffect(() => {
    const subscriber = fireAuth.fireAuth.onAuthStateChanged(user => {
      console.log('======user', JSON.stringify(user, null, 8));
      setLoggedIn(!!user?.email);
    });
    return subscriber;
  }, [setLoggedIn]);

  const logOut = useCallback(async () => {
    try {
      await fireAuth.signOut();
    } catch (error) {
      console.log('error while sign in outing...');
    }
  }, []);

  const value = useMemo(() => {
    return {isLoggedIn: Boolean(isLoggedIn), logOut};
  }, [isLoggedIn, logOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
