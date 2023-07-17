import { Container } from './style';

export function InputValue({ type, id, ...rest }) {
  return (
    <Container>
      <input type={type} id={id} {...rest} />
    </Container>
  );
}