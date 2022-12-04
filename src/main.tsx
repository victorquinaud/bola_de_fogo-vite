import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import StyledThemeProvider from './store/ThemeProvider';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StyledThemeProvider>
      <App />
    </StyledThemeProvider>
  </BrowserRouter>
);
