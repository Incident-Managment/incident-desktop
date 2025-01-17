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
      onLoginSuccess(userData); // Llama a la función de callback con los datos del usuario
    } catch (err) {
      setError(err.message);
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