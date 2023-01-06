import ReactLoading from 'react-loading'

// -------------------------------------------------------------------

interface LoadProps {
  readonly type: any
  readonly color: string
}

export function Load({ type, color }: LoadProps) {
  return <ReactLoading type={type} color={color} height={20} width={100} />
}
