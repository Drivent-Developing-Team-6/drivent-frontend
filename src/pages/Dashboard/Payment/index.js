import { useState } from 'react';
import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import BookTicket from '../../../components/Ticket/BookTicket';
import PayTicket from '../../../components/PayTicket';

export default function Payment() {
  const { enrollment } = useEnrollment();
  const { ticket } = useTicket();
  const [ ticketchosen, setTicketChosen] = useState(false);

  if (!enrollment) {
    alert('Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso');
    // TODO : Warning page
    return
  }

  if (ticket || ticketchosen) return <PayTicket/>;

  return (
    <BookTicket setTicketChosen={setTicketChosen}/>
  );
}