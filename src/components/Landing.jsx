import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center  content-center items-center sm:py-12">
      <div className="font-semibold text-center">
        Hello I am Debarshi Das. <br />
        Choose
        <div className="flex flex-row gap-x-8 justify-center">
          <Link to="/login">
            <button className="mt-4 bg-indigo-500 text-white py-1 px-4 rounded-lg">Login</button>
          </Link>
          <Link to="/register">
            <button className="mt-4 border bg-indigo-500 text-white py-1 px-4 rounded-lg">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
