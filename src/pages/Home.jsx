/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../Firebase';
import EditDetails from '../components/EditDetails';

function Home() {
  const { logOut, user } = useAuthContext();
  let reqData = {
    name: user.displayName,
    image: user.photoURL
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      reqData = docSnap.data();

      console.log(reqData);
      if (!reqData) {
        reqData.image = user.photoURL;
        reqData.name = user.displayName;
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center  content-center items-center sm:py-12">
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <div className=" mt-4 space-x-3 md:mt-6">
            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={reqData.photoURL} alt="profile" id="dp" />
          </div>
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white" id="name">
            {reqData.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
          <div className="flex mt-4 space-x-3 md:mt-6">
            <Link
              to="/edit"
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit Details
            </Link>
            <button
              className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-blue-800 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* <EditDetails className="mt-3" /> */}
    </div>
  );
}

export default Home;
