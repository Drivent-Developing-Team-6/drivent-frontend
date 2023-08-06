import styled from "styled-components";

export default function Payment() {
  return (
    <Containner>
      <h1>ingresso e pagamento</h1>
      <p>escolha o tipo de ingresso:</p>
      <div>
        <button className="presential">
          presencial
        </button>
        <button className="online">
          online
        </button>
        
      </div>
      <p>fechado, o total ficou em R$100. Agora é só confirmar:</p>
      <button>
        reservar ingresso
      </button>
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


display: flex;


`

