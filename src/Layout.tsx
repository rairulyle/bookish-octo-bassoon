import { ReactNode } from 'react';
import sesimi from '/sesimi.svg';

type LayoutProps = {
  children: ReactNode;
  complementary: ReactNode;
};

const Layout = ({ children, complementary }: LayoutProps) => {
  return (
    <div className="grid items-center">
      <main className="space-y-6">
        <div>
          <img
            src={sesimi}
            className="logo mx-auto"
            alt="sesimi logo"
            width="140"
          />
          <h4 className="-mt-8">Daily Todo</h4>
        </div>
        <div className="card text-left">{children}</div>
      </main>
      <aside className="mt-3 text-xs opacity-50">{complementary}</aside>
    </div>
  );
};

export default Layout;
