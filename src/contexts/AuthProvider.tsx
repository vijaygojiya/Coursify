import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import {fireAuth} from '@/services/firebase';

interface Props {
  isLoggedIn: boolean;
}

export const AuthContext = createContext<Props | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState(
    Boolean(fireAuth.currentUser?.email),
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setLoggedIn(Boolean(user));
    });
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
