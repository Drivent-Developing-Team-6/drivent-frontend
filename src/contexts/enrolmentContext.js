import { createContext } from 'react';
import React, { useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ticket, setTicket]=useState('');
  const [enroll, setEnroll]=useState(false);

  return (
    <AuthContext.Provider value={{ ticket, setTicket, enroll, setEnroll }}>
      {children}
    </AuthContext.Provider>
  );
};
