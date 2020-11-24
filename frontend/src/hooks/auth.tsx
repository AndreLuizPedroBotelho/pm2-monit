import React, { createContext, useCallback, useState, useContext } from 'react';

interface AuthContextData {
  signIn(token: string): void;
  signOut(): void;
  token: string | null;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [jwtToken, setJwtToken] = useState(
    localStorage.getItem('@P2Monit:jwtToken'),
  );

  const signIn = useCallback(async (token: string) => {
    localStorage.setItem('@P2Monit:jwtToken', token);
    setJwtToken(token);
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem('@P2Monit:jwtToken');
    setJwtToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: jwtToken,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
