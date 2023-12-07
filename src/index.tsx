import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { LoadingProvider } from './contexts/LoadingContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { DictionaryProvider } from './contexts/DictionaryContext';

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <LoadingProvider>
        <LanguageProvider>
          <DictionaryProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
          </DictionaryProvider>
        </LanguageProvider>
      </LoadingProvider>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
