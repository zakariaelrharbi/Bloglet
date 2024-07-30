import { Alert, Button, TextInput } from 'flowbite-react' // Importing components from Flowbite for UI elements
import React, { useEffect, useRef, useState } from 'react' // Importing React and hooks from React
import { useSelector } from 'react-redux' // Importing useSelector to access Redux store state
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage' // Importing Firebase storage functions
import { app } from '../firebase';// Importing the Firebase app instance from the firebase file

const DashProfile = () => {
  // Accessing currentUser from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser)
  
  // State for storing the selected image file
  const [uploadImage, setUploadImage] = useState(null)
  // State for storing the URL of the selected image for preview
  const [imageFileUrl, setImageFileUrl] = useState(null)

  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null)
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null)
  console.log(imageFileUploadingProgress, imageFileUploadingError)
  
  // Ref for accessing the file input element directly
  const filePickerref = useRef(null)

  // Function to handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0] // Getting the selected file
    if(file){
      setUploadImage(file) // Setting the selected file in state
      setImageFileUrl(URL.createObjectURL(file)) // Creating a URL for the selected file to display a preview
    }
  }

  // useEffect to handle new image upload
  useEffect(() => {
    if(uploadImage){
      // Code to upload the image to the server
      newImageUpload();
    }
  }
  , [uploadImage]) // Dependency array for the useEffect

  // Function to upload the new image to the server
  const newImageUpload = async () => {
    // Code to upload the image to the server
    const storage = getStorage(app) // Getting the Firebase storage instance
    const fileName = new Date().getTime() + uploadImage.name; // Generating a unique file name
    const storageRef = ref(storage, fileName) // Creating a reference to the storage location
    const uploadTask = uploadBytesResumable(storageRef, uploadImage) // Uploading the image to the storage location
    uploadTask.on('state_changed', // Event listener for upload state change
      (snapshot) => {
        // Code to handle upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0))
      },
      (error) => {
        // Code to handle upload error
        setImageFileUploadingError("Error uploading file (file must be an image and less than 2MB)");
      },
      () => {
        // Code to handle upload completion
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Code to handle download URL
          setImageFileUrl(downloadURL)
        });
      }
      )
  }

  return (
    <div className='max-w-lg mx-auto p-3'> {/* Container for profile form with padding and center alignment */}
      <h1 className='my-8 text-center font-semibold text-3xl '>Profile</h1> {/* Profile heading */}
      <form className='flex flex-col gap-4'> {/* Form container with vertical spacing */}
        <input type='file' accept='image/*' onChange={handleImageUpload} className='hidden' ref={filePickerref}/> {/* Hidden file input for image upload */}
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerref.current.click()}>
          {/* Image display area with click event to trigger file input */}
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
          className='rounded-full w-full h-full object-cover border-8 border-[#acacab]' />
          {/* Displaying the image, either from file upload or from current user profile picture */}
        </div>
        {imageFileUploadingError && <Alert color='failure'>{imageFileUploadingError}</Alert>} {/* Alert for image upload error */}
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/> {/* Input for username with default value */}
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/> {/* Input for email with default value */}
        <TextInput type='password' id='password' placeholder='password'/> {/* Input for password */}
        <Button type='submit' className=''>Update</Button> {/* Button to submit the form */}
      </form>
      <div className='text-red-500 flex justify-between mt-5'> {/* Container for account management actions */}
        <span className='cursor-pointer'>Delete Account</span> {/* Link to delete account */}
        <span className='cursor-pointer'>Sign Out</span> {/* Link to sign out */}
      </div>
    </div>
  )
}

export default DashProfile // Exporting the DashProfile component
