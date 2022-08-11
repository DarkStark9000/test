/* eslint-disable no-unused-expressions */
/* eslint-disable no-alert */
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../Firebase';
import { useAuthContext } from '../contexts/AuthContext';

function EditDetails() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const uuid = user.uid;
  const { email } = user;

  const [file, setFile] = useState('');
  const [data, setData] = useState({});
  const [newName, setNewName] = useState('');

  const resetForm = () => {
    document.getElementById('file').value = '';
    document.getElementById('name').value = '';
  };

  useEffect(() => {
    const uploadFile = () => {
      const imageRef = ref(storage, `users${file.name}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              console.log("User doesn't have permission to access the object");
              break;
            case 'storage/canceled':
              console.log('User canceled the upload');
              break;
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect error.serverResponse');
              break;
            default:
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData({
              image: downloadURL,
              name: newName,
              email,
              createdAt: serverTimestamp()
            });
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      setDoc(doc(db, 'users', uuid), {
        ...data
      });
      alert('Added');
      resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">Edit your details</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-indigo-400 rounded-t-md" />
            <div className="py-6 px-8">
              <label className="block font-semibold">Edit Name</label>
              <input
                id="name"
                onChange={(e) => setNewName(e.target.value)}
                type="text"
                placeholder="Name"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
              />
              <br />
              <label className="block font-semibold">
                Edit Picture <DriveFolderUploadIcon className="icon" />
              </label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} style={{ display: 'block' }} />
              <div className="flex justify-between items-baseline">
                <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg" onClick={handleAdd}>
                  Confirm Details
                </button>
                <span className="text-gray-600 text-sm text-right">Go back and log out to see the edited details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDetails;
