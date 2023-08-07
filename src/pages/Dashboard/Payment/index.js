import styled from "styled-components";
import React, { useState } from "react";
import { AuthContext } from "../../../contexts/enrolmentContext";




export default function Payment() {

  const { enroll, setEnroll } = React.useContext(AuthContext)


  const [ticket,setTicket]= useState('')
  const [choosedticket,setChoosedticket]=useState(false)
  const [ticketValue,setTicketValue] =useState('')
  const [checkEnrollment] = useState(false)
  const[review,setReview]=useState(false)

  function presentialTicket(){
    setChoosedticket(true)
    setTicket('presential')
    setTicketValue("250")
  }

  function onlineTicket(){
    setChoosedticket(true)
    setTicket('online')
    setTicketValue('100')

  }
  function checkTicket(){
    setReview(true)
  }


  return (



    <Containner>
      {checkEnrollment ? <div2> <p>você precisa se inscrever primeiro
      </p> </div2> : <>
        <h1>ingresso e pagamento</h1>
        <p>escolha o tipo de ingresso:</p>
        <div>
          <button className="presential" onClick={()=>{presentialTicket()}}>
            presencial
          </button>
          <button className="online" onClick={()=>{onlineTicket()}}>
            online
          </button>

        </div>
        {choosedticket? <>
         <p>fechado, o total ficou em R${ticketValue}. Agora é só confirmar:</p>
        <button onClick={()=>{checkTicket()}}>
          reservar ingresso
        </button>
        </>
        :''}
        
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

div{
  margin: 20px;
  width: 60%;
  
  button{
    width: 150px;
    height: 150px;
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
div2{
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

display: flex;


`

