import { BiExit } from 'react-icons/bi'

import { Button } from './styles'

// -------------------------------------------------------------------

interface SignOutButtonProps {
  readonly onClick: () => void
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  return (
    <Button className="exit" type="button" onClick={onClick}>
      <span>Sair</span>
      <BiExit size={10} />
    </Button>
  )
}
