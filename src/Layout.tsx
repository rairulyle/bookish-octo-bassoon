import { ReactNode } from 'react';
import sesimi from '/sesimi.svg';

type LayoutProps = {
  children: ReactNode;
  complementary: ReactNode;
};

const Layout = ({ children, complementary }: LayoutProps) => {
  return (
    <div className="grid items-center">
      <main>
        <div>
          <img
            src={sesimi}
            className="logo mx-auto"
            alt="Vite logo"
            width="140"
          />
          <h4 className="-mt-8">Daily Todo</h4>
        </div>
        <div className="card text-left">{children}</div>
      </main>

      <aside>{complementary}</aside>
    </div>
  );
};

export default Layout;
