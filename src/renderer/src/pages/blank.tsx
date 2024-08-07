import { Link } from 'react-router-dom'

export function Blank() {
  return (
    <main className="flex-1 flex items-center justify-center text-rotion-400">
      <Link to={'/document'}> Acessar documento</Link>
    </main>
  )
}
