import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../providers/users/UserContext';
import { Spin } from 'antd';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;