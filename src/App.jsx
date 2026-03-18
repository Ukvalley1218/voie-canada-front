import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { SettingsProvider } from './contexts/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <RouterProvider router={router} />
    </SettingsProvider>
  );
}

export default App;