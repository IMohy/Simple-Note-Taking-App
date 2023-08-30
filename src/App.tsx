import { ConfigProvider } from 'antd';
import HomePage from 'components/HomePage';

function App() {
  return (
    <ConfigProvider>
      <HomePage />
    </ConfigProvider>
  );
}

export default App;
