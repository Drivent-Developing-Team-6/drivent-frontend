import styled from 'styled-components';

export default function PaymentPage() {
  return (
    <Containner>
      <div className="card"> <p>em breve pagamento pelo cartão..</p> </div>
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
