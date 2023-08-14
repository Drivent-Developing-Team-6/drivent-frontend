import { createContext } from 'react';
import React, { useState } from 'react';

const EnrollContext = createContext({});
export default EnrollContext;

export function EnrollProvider({ children })  {
  const [ticket, setTicket]=useState('');
  const [enroll, setEnroll]=useState(false);
  const [paymentPage, setpaymentPage]=useState(false);

  return (
    <EnrollContext.Provider value={{ ticket, setTicket, enroll, setEnroll, paymentPage, setpaymentPage }}>
      {children}
    </EnrollContext.Provider>
  );
}
