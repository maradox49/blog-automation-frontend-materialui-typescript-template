import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { LoadingProvider } from './contexts/LoadingContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <LoadingProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadingProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
