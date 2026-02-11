import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = window.localStorage.getItem("clienUser");

    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  return { user };
};
