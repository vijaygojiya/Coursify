import React, {createContext, PropsWithChildren, useState} from 'react';

interface Props {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<Props | undefined>(undefined);

const AuthProvider: React.FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login: () => {
          setLoggedIn(true);
        },
        logout: () => {
          setLoggedIn(false);
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
