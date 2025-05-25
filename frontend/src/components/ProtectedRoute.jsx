import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    console.log('ProtectedRoute - Token status:', token ? 'Present' : 'Missing');
  }, [token]);
  
  if (!token) {
    console.log('ProtectedRoute - No token found, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute - Token found, rendering protected content');
  return children;
};

export default ProtectedRoute; 