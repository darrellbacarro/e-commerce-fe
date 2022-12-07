import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { setupStore } from './redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import palette from "./theme/palette";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore()}>
    <ThemeProvider theme={createTheme({ palette })}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
