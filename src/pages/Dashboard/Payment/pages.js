import PaymentPage from "./paymentPage"
import TicketPage from "./ticketPage"
import React,{useContext} from "react"
import EnrollContext from "../../../contexts/enrolmentContext"



export default function Pages(){
    const {enroll,ticket,setTicket,paymentPage} = useContext(EnrollContext)



    return(<>
    
        {
            paymentPage ? <PaymentPage/> : <TicketPage/>
          }
    </>
    )
}