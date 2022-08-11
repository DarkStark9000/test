import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useAuthContext } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { logIn, googleSignIn } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate('/home');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">Login to your account</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-indigo-400 rounded-t-md" />
            <div className="py-6 px-8">
              <label className="block font-semibold">Username or Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <label className="block mt-3 font-semibold">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <div className="flex justify-between items-baseline">
                <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg" onClick={handleLogin}>
                  Login
                </button>
                <div className="flex flex-col text-right justify-center text-xs p-4">
                  Dont have an account?
                  <Link to="/register">Register</Link>
                </div>
              </div>
              <hr />
              <div className="mt-6">
                <GoogleButton className="g-btn" type="dark" onClick={handleGoogleSignIn} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
