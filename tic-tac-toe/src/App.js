import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/login";
import Game from "./components/game";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  React.useEffect(() => {
    const autentication = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return autentication;
  }, []);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return <Game />;
}
