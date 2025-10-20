import { ReactNode } from 'react'
import sesimi from '/sesimi.svg'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={`grid items-center`}>
      <main>
        <div>
          <img
            src={sesimi}
            className="logo mx-auto"
            alt="Vite logo"
            width="140"
          />
        </div>
        <h1>todo…</h1>
        <div className="card">{children}</div>
      </main>
    </div>
  )
}

export default Layout
