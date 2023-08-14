import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import EnrollContext from '../../../contexts/enrolmentContext';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import { AiFillCheckCircle } from 'react-icons/ai';
import useToken from '../../../hooks/useToken';

export default function PaymentPage() {
  const { ticket, setTicket, 
    paymentPage, setpaymentPage, 
    choosedOnlineTicket, setChoosedOnlineTicket,
    choosedPresentialTicket, setChoosedPresentialticket,
    ticketValue, setTicketValue,
    hotel, setHotel
  } = useContext(EnrollContext);

  const token = useToken();
  const [payment, setPayment] = useState(false);
  const [card, setCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    issuer: ''
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    if (name === 'number' && value.length > 16) {
      return;
    }

    if (name === 'cvc' && (value.length > 4)) {
      return;
    }

    if (name === 'expiry') {
      const inputValue = value.replace(/\D/g, '');
      if (inputValue.length > 4) {
        return;
      }
      if (inputValue.length >= 2) {
        const month = inputValue.slice(0, 2);
        const year = inputValue.slice(2);
        const formattedExpiry = `${month}/${year}`;
        setCard((prev) => ({ ...prev, expiry: formattedExpiry }));
      }
    }

    setCard((prev) => ({ ...prev, [name]: value }));
  };

  function sendPaymentData() {
    setPayment(true);
    const paymentData = {
      ticketId: 1, //pegar ticketId
      issuer: card.issuer,
      number: card.number,
      name: card.name,
      expirationDate: card.expiry,
      cvv: card.cvc
    };
    console.log(paymentData);

    // const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/payments/process`, 
    //   paymentData, 
    //   { headers: {
    //     'Authorization': `Bearer ${token}`
    //   } });
    
    // promise.then(() => {
    //   setPayment(true);
    // });
    // promise.catch((erro) => {
    //   console.log(erro.response.status);
    //   alert(erro.message);
    // });
  }

  return (
    <Containner>
      <>
        <Message>Ingresso escolhido</Message>
        <ChooseTicket>
          {ticket === 'online' ? 'Online e sem hotel'
            : (hotel ? 'Presencial e com hotel' : 'Presencial e sem hotel')} <br/>
            R${ticketValue}
        </ChooseTicket>
        <Message>Pagamento</Message>
        {payment ? (
          <ConfirmedPaymentContainer>
            <AiFillCheckCircle
              style={{ fontSize: '40px', color: 'green' }}/>
            <div>
              <h1>Pagamento confirmado</h1>
              <a>Prossiga para escolha de hospedagem e atividades</a>
            </div>
          </ConfirmedPaymentContainer>
        ) : (
          <>
            <CardContainer>
              <Cards
                number={card.number}
                expiry={card.expiry}
                cvc={card.cvc}
                name={card.name}
                issuer={card.issuer}
              />
              <form>
                <input
                  type="number"
                  name="number"
                  placeholder="Card Number"
                  value={card.number}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry"
                  value={card.expiry}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={card.cvc}
                  onChange={handleInputChange}
                  minLength={3}
                  maxLength={4}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={card.name}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="issuer"
                  placeholder="Issuer"
                  value={card.issuer}
                  onChange={handleInputChange}
                />
              </form>
            </CardContainer>
            <FinishPaymentButton onClick={sendPaymentData}>
              FINALIZAR PAGAMENTO
            </FinishPaymentButton>
          </>
        )}
      </>
    </Containner>
        
  );
}

const Containner = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
.card{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p{
     color: black;
  font-size: 20px;
  }
}
`;

const Message = styled.p`
  margin-left: 30px;
  color: gray;
  font-size: 20px;
`;

const ChooseTicket = styled.button`
  width: 300px;
  height: 100px;
  background-color: #FFEED2;
  border-radius: 5px;
  margin: 20px;
  font-size: 18px;
  border: none;
`;

const CardContainer = styled.div`
  margin: 20px;
  padding: 20px;
  height: 150px;
  width: 500px;
  display: flex;
  flex-direction: row;
  form {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    input {
      height: 200%;
      margin-bottom: 15px;
    }
  }
`;

const FinishPaymentButton = styled.button`
  margin-left: 30px;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  background-color: #e0e0e0;
  margin-top: 80px;
  font-size: 10px;
  height: 30px;
  width: 150px;
  padding: 6px 16px;
  border-radius: 4px;
  border: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
`;

const ConfirmedPaymentContainer = styled.div`
  margin-top: 25px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    margin-left: 15px;
  }
  h1 {
    font-weight: 600;
  }
`;
