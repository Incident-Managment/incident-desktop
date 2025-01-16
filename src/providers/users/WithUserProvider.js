import React from 'react';
import { UserProvider } from './UserContext';

const withUserProvider = (WrappedComponent) => {
  return (props) => (
    <UserProvider>
      <WrappedComponent {...props} />
    </UserProvider>
  );
};

export default withUserProvider;