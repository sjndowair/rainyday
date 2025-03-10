import { ILayOutProps } from "../types/create-membership";
import Membership from "../pages/membership";
import { auth } from "../constants/firebase-contants";
import Loading from "../loading/spinner";
import { useState, useEffect } from "react";
import { useThemeStore } from "../store";

const Member = ({ children }: ILayOutProps) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  if (!authChecked) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Membership />;
  }

  return children;
};

export default Member;
