import { Container } from './style';
import CaretLeft from '../../assets/caretLeft.svg';


export const Return = () => {
  return (
    <Container to='/' >
      <img src={CaretLeft} alt="Voltar" /> Voltar
    </Container>
  )
}