import { Container } from './styles'

interface TypeBoxProps {
  text: string
}

export function TypeBox({ text }: TypeBoxProps) {
  const capitalizeText = text.replace(/\b\w/g, l => l.toUpperCase())

  return (
    <Container textColor={text}>
      <h5>{capitalizeText}</h5>
    </Container>
  )
}
