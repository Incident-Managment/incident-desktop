import { useState } from 'react';
import { login } from '../services/users.services';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await login(email, password);
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    handleLogin,
  };
};

export default useLogin;