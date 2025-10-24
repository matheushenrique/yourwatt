import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  // Adiciona propriedade computada isAdmin
  const isAdmin = useMemo(() => {
    return context.user?.role === 'admin';
  }, [context.user]);

  return {
    ...context,
    isAdmin,
  };
};