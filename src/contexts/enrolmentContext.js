import { createContext } from 'react';
import React, { useState } from 'react';

const EnrollContext = createContext({});
export default EnrollContext;

export function EnrollProvider({ children })  {; 
  const [ticket, setTicket]=useState('');
  const [enroll, setEnroll]=useState(false);
  const [paymentPage, setpaymentPage]=useState(false);
  const [choosedOnlineTicket, setChoosedOnlineTicket] = useState('');
  const [choosedPresentialTicket, setChoosedPresentialticket] = useState(false);
  const [ticketValue, setTicketValue] = useState(Number);
  const [hotel, setHotel] = useState(false);

  return (
    <EnrollContext.Provider value={{ ticket, setTicket, 
      enroll, setEnroll, 
      paymentPage, setpaymentPage,
      choosedOnlineTicket, setChoosedOnlineTicket,
      choosedPresentialTicket, setChoosedPresentialticket,
      ticketValue, setTicketValue,
      hotel, setHotel
    }}>
      {children}
    </EnrollContext.Provider>
  );
}
