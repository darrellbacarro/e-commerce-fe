import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { setupStore } from './redux';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
