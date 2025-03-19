// App.js
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { UserProvider } from './providers/users/UserContext';

const App = () => (
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>
);

export default App;