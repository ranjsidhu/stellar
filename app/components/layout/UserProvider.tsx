"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  role: string | null;
  setRole: (role: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{
  initialRole: string | null;
  children: React.ReactNode;
}> = ({ initialRole, children }) => {
  const [role, setRole] = useState<string | null>(initialRole);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
