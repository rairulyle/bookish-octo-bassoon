import { TodoList } from '@components/TodoList';

import Layout from '../Layout';
import './app.css';

function App() {
  return (
    <Layout
      complementary={
        <footer>
          © {new Date().getFullYear()}{' '}
          <a
            href="https://rairulyle.me/"
            target="_blank"
            rel="noopener noreferrer"
          >
            rairulyle.me
          </a>
        </footer>
      }
    >
      <TodoList />
    </Layout>
  );
}

export default App;
