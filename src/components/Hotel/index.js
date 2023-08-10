import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import { getHotels } from '../../services/hotelApi';
import UserContext from '../../contexts/UserContext';
import { getPersonalInformations } from '../../services/enrollmentApi';
import useToken from '../../hooks/useToken';

dayjs.extend(CustomParseFormat);

export default function PersonalInformationForm() {
  const token = useToken();
  
  const [showHotels, setShowHoteis] = useState(false);
  const { userId } = useContext(UserContext);
  const [selecionados, setSelecionados] = useState([]);
  const [hoteis, setHoteis] = useState([
    {
      id: 1,
      name: 'Drivent Resort',
      image: 'teste',
      rooms: [
        {
          id: 101,
          number: 101,
          capacity: 2,
          hotelId: 1,
        },
        {
          id: 102,
          number: 102,
          capacity: 3,
          hotelId: 1,
        }]
    },
    { 
      id: 2,
      name: 'Marechal',
      image: 'teste2',
      rooms: [
        {
          id: 101,
          number: 101,
          capacity: 2,
          hotelId: 1
        },
        {
          id: 102,
          number: 102,
          capacity: 3,
          hotelId: 1
        }]
    }
  ]);
  const [rooms, SetRooms] = useState([
    { id: 101,
      name: 101,
      capacity: 2,
      hotelId: 1 },
    {
      id: 102,
      name: 102,
      capacity: 3,
      hotelId: 1
    }
  ]);

  const [qtdsSelecionados, SetQtds] = useState([]);
  async function checarUser(token) {
    try {
      const enrollment = await getPersonalInformations(token);
      if (enrollment) setShowHoteis(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checarUser(token);
    listarHoteis(userId);
  }, []);

  async function listarHoteis(userId) {
    try {
      const respostaHotels = await getHotels(userId);
      console.log(respostaHotels);
    } catch (error) { 
      console.log(error);
    }
  }

  function selecionarAssento( id ) {
    let array = [...selecionados];

    if (array.includes(id)) {
      const array2 = [];
      setSelecionados(array2);
    }else{
      if (selecionados.length > 0) {
        array = [id];
        setSelecionados(array);
      } else {
        array.push(id);
        setSelecionados(array);
      }
    }
  };

  function selecionarQuarto( id ) {
    let array = [...qtdsSelecionados];

    if (array.includes(id)) {
      const array2 = [];
      SetQtds(array2);
    }else{
      if (qtdsSelecionados.length > 0) {
        array = [id];
        SetQtds(array);
      } else {
        array.push(id);
        SetQtds(array);
      }
    }
  };

  return (
    <Container>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {showHotels ?
        <>  
          <StyledTypography2>Primeiro, escolha seu hotel</StyledTypography2>
          <ListaHoteis>
            {hoteis.map(disponiveis => (            
              <BoxHotel onClick={() => selecionarAssento(disponiveis.id)} background={ (selecionados.includes(disponiveis.id) ?  '#FFEED2':'#EBEBEB')}>
                <ImagemHotel>{disponiveis.image}</ImagemHotel>
                <NomeHotel>{disponiveis.name}</NomeHotel>
                <InfoHotel>Tipos de acomodação:</InfoHotel>
                <DadoHotel>Single e Double</DadoHotel>
                <InfoHotel>Vagas Disponíveis:</InfoHotel>
                <DadoHotel>103</DadoHotel>    
              </BoxHotel>      
            ))}
          </ListaHoteis>
        </>  : 
        <ErroPayment><h2>Você precisa ter confirmado pagamento antes
        de fazer a escolha de hospedagem</h2></ErroPayment>
      }
      {selecionados.length > 0 ? (
        <SelecionouHotel>
          <StyledTypography2>Ótima pedida! Agora escolha seu quarto:</StyledTypography2>
          <Quartos>
            {rooms.map (quartos => (
              <BoxQuarto onClick={() => selecionarQuarto(quartos.id)} background={ (qtdsSelecionados.includes(quartos.id) ?  '#FFEED2':'#FFFFFF')}>
                <NumeroQuarto>{quartos.name}</NumeroQuarto>
                <QuantPessoas>
                  {Array.from({ length: quartos.capacity }).map((_, index) => (
                    <IconePessoas>
                      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                        <path d="M13.5 13.5C14.8427 13.5 16.1303 12.9666 17.0797 12.0172C18.0291 11.0678 18.5625 9.78016 18.5625 8.4375C18.5625 7.09484 18.0291 5.80717 17.0797 4.85777C16.1303 3.90837 14.8427 3.375 13.5 3.375C12.1573 3.375 10.8697 3.90837 9.92027 4.85777C8.97087 5.80717 8.4375 7.09484 8.4375 8.4375C8.4375 9.78016 8.97087 11.0678 9.92027 12.0172C10.8697 12.9666 12.1573 13.5 13.5 13.5ZM16.875 8.4375C16.875 9.33261 16.5194 10.1911 15.8865 10.824C15.2535 11.4569 14.3951 11.8125 13.5 11.8125C12.6049 11.8125 11.7464 11.4569 11.1135 10.824C10.4806 10.1911 10.125 9.33261 10.125 8.4375C10.125 7.54239 10.4806 6.68395 11.1135 6.05101C11.7464 5.41808 12.6049 5.0625 13.5 5.0625C14.3951 5.0625 15.2535 5.41808 15.8865 6.05101C16.5194 6.68395 16.875 7.54239 16.875 8.4375ZM23.625 21.9375C23.625 23.625 21.9375 23.625 21.9375 23.625H5.0625C5.0625 23.625 3.375 23.625 3.375 21.9375C3.375 20.25 5.0625 15.1875 13.5 15.1875C21.9375 15.1875 23.625 20.25 23.625 21.9375ZM21.9375 21.9307C21.9358 21.5156 21.6776 20.2669 20.5335 19.1227C19.4333 18.0225 17.3627 16.875 13.5 16.875C9.63562 16.875 7.56675 18.0225 6.4665 19.1227C5.32238 20.2669 5.06588 21.5156 5.0625 21.9307H21.9375Z" fill="black"/>
                      </svg>
                    </IconePessoas>
                  ))}
                </QuantPessoas>
              </BoxQuarto>
            ))}
          </Quartos>
        </SelecionouHotel>
      ) : null}  
          
    </Container>
  );
}

const Container = styled.div`
width: 100%;
height: 100vh;
display:flex;
flex-direction: column;
`;
const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;

const StyledTypography2 = styled(Typography)`
  margin-bottom: 20px!important;
  color: #8E8E8E;
  font-size: 20px;
  font-weight: 400!important;
`;

const ListaHoteis = styled.div`
display:flex;
`;

const BoxHotel = styled.div`
width: 196px!important;
height:264px!important;
background-color: ${props => props.background};
border-radius:10px;
margin-bottom:52px;
margin-right:19px;`;

const ImagemHotel = styled.div`
  width: 168px!important;
  height:109px!important;
  border-radius:5px;
  margin-left:14px;
  margin-top: 16px;
  margin-bottom:10px;
  background-color: #FFFFFF;
`;

const NomeHotel = styled(Typography)`
  margin-left:14px!important;
  color: #343434!important;
  font-size: 20px!important;
  margin-bottom:10px;
`;

const InfoHotel = styled(Typography)`
  color: #3C3C3C!important;
  font-size: 12px!important;
  font-weight: 700!important;
  margin-left:14px!important;
  margin-bottom:2px;
`;

const DadoHotel = styled(Typography)`
  color: #3C3C3C!important;
  font-size: 12px!important;
  font-weight: 400!important;
  margin-left:14px!important;
  margin-bottom:14px!important;
`;

const ErroPayment = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    color: #8E8E8E;
    font-size: 20px;
    font-weight: 400;
  }
`;

const SelecionouHotel = styled.div`
  
`;

const Quartos = styled.div`
width: 100%!important;
height:100%!important;
display:flex;
margin-top:33px;
`;

const BoxQuarto = styled.div`
width: 190px!important;
height:45px!important;
display:flex;
background-color: ${props => props.background};
border: 1px solid #CECECE;
border-radius:10px;
justify-content:space-between;
padding-right:9px;
padding-left:16px;
align-items:center;
margin-left:17px;`;

const NumeroQuarto = styled(Typography)`
  color: #454545!important;
  font-size: 20px!important;
  font-weight: 700!important;
`;

const QuantPessoas = styled.div`
  display:flex;
`;

const IconePessoas = styled(Typography)`
  color: #343434;
  font-size: 20px;
`;
