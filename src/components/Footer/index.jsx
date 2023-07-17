import { Container } from './style';
import FooterImg from '../../assets/footer.svg'

export const Footer = () => {
  return (
    <Container>
      <img src={FooterImg} />

      <p>© 2023 - Todos os direitos reservados.</p>
    </Container>
  )
}