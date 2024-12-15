import {AuthContext} from '@/contexts/AuthProvider';
import {useContext} from 'react';

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}
