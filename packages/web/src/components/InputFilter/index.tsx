import { Input } from './styles'

// -------------------------------------------------------------------

interface InputFilterProps {
  readonly setSearch: (value: string) => void
}

export function InputFilter({ setSearch }: InputFilterProps) {
  return (
    <Input
      type="text"
      placeholder="Pesquise pelo nome do pokémon"
      onChange={(event) => setSearch(event.target.value)}
    />
  )
}
