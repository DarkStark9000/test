/* eslint-disable no-alert */
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();

  console.log('Check user in Private: ', user);
  if (!user) {
    alert('Not Signed In');
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
