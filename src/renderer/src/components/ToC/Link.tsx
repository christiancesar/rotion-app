import { ReactNode } from 'react'

interface ToCLinkProps {
  children: ReactNode
  href: string
}

export function ToCLink({ href, children }: ToCLinkProps) {
  return (
    <a
      href={href}
      className="hover:text-rotion-50"
      onClick={(event) => {
        event.preventDefault()
        document.querySelector(`#${href}`)?.scrollIntoView({
          behavior: 'smooth',
        })
      }}
    >
      {children}
    </a>
  )
}
