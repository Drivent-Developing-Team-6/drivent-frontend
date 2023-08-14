import styled from "styled-components";
import React, { useState, useContext } from "react";
import EnrollContext from "../../../contexts/enrolmentContext";



export default function TicketPage() {

  const { ticket, setTicket, setpaymentPage } = useContext(EnrollContext)


  const [choosedOnlineTicket, setChoosedOnlineTicket] = useState('')
  const [choosedPresentialTicket, setChoosedPresentialticket] = useState(false)
  const [ticketValue, setTicketValue] = useState(Number)
  const [hotel, setHotel] = useState(false)


  function presentialTicket() {
    setChoosedPresentialticket(true)
    setChoosedOnlineTicket(false)
    setTicketValue(250)
    setTicket('presential')
  }

  function onlineTicket() {
    setChoosedPresentialticket(false)
    setChoosedOnlineTicket(true)
    setTicketValue(100)
    setTicket('online')

  }

  const ticketReservation = {
    ticket: ticket,
    price: ticketValue,
    hotel: hotel
  }

  function checkTicket() {
    console.log(ticketReservation)
    setpaymentPage(true)

  }


  return (



    <Containner>
      {<>
        <h1>ingresso e pagamento</h1>

        <div className="ticket1">
          <p>escolha o tipo de ingresso:</p>
          <button onClick={() => { presentialTicket() }}>
            presencial
            R$250
          </button>
          <button onClick={() => { onlineTicket() }}>
            online <br />
            R$100
          </button>
        </div>
        {choosedPresentialTicket ?
          <>
            <div className="ticket2">
              <p>Otimo! Agora escolha sua modalidade de hospefagem</p>
              <button onClick={() => { setTicketValue(250), setHotel(false) }}>sem hotel <br /> R$0</button>
              <button onClick={() => { setTicketValue(600), setHotel(true) }}>com hotel <br /> R$350</button>
              <p>fechado, o total ficou em R${ticketValue}. Agora é só confirmar:</p>
            </div>
            <button onClick={() => { checkTicket() }}>
              reservar ingresso
            </button>

          </>


          : ''}
        {choosedOnlineTicket ? <>
          <p>fechado, o total ficou em R${ticketValue}. Agora é só confirmar:</p>
          <button onClick={() => { checkTicket() }}>
            reservar ingresso
          </button>
        </> : ''}

      </>}

    </Containner>




  )
}
const Containner = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
h1{
  text-align: center;
  margin-top:40px;
  margin-bottom: 40px;
  font-size: 30px;
}

p{
  margin-left: 30px;
  color: gray;
  font-size: 20px;
}


.ticket1{
  margin: 20px;
  width: 60%;
  p{
    margin-left: 20px;
  }
  
}

.ticket2{
 margin-left: 20px;
  width: 60%;
  

}

.ticket1,.ticket2{
  button{
    width: 150px;
    height: 140px;
    background-color: aliceblue;
    border-radius: 5px;
    margin: 20px;
    font-size: 18px;
  }
}

button{
  margin-top: 20px;
  margin-left: 20px;
  width: 200px;
  height: 30px;
  border-radius: 5px;
}


display: flex;


`


