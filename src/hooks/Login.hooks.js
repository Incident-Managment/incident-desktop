import { useState } from 'react';
import { login } from '../services/users.services';

const useLogin = (onLoginSuccess) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      onLoginSuccess(userData);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
  };
};

export default useLogin;