import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import EditDetails from './components/EditDetails';
import ProtectedRoute from './components/ProtectedRoutes';
import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
