import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { useContext } from 'react';
import { LoadingContext } from './contexts/LoadingContext';
import SuspenseLoader from './components/SuspenseLoader';

function App() {
  const content = useRoutes(router);
  const { isLoading, loadingMessage } = useContext(LoadingContext);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
        {
          isLoading && <SuspenseLoader message={loadingMessage}/>
        }
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
