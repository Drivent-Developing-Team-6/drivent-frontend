import styled from "styled-components";
import React, { useState,useContext } from "react";
import EnrollContext from "../../../contexts/enrolmentContext";
import TicketPage from "./ticketPage";
import PaymentPage from "./paymentPage";
import Pages from "./pages";

export default function Payment() {

  const {enroll,ticket,setTicket,paymentPage} = useContext(EnrollContext)

   


  return (

    <Containner>

      {enroll ? <Pages/> :<p className="unauthorized">Você precisa completar sua inscrição antes de prosseguir pra escolha de pagamentos</p>} 
      
    </Containner>

  )
}

const Containner = styled.div`
width: 100%;
height: 100%;
display: flex;
align-items: center;
.unauthorized{
  font-size: 20px;
}
`