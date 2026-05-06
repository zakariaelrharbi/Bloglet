import { Alert, Button, Modal } from "flowbite-react"; // Importing components from Flowbite for UI elements
import React, { useEffect, useRef, useState } from "react"; // Importing React and hooks from React
import { useSelector } from "react-redux"; // Importing useSelector to access Redux store state
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch } from "react-redux"; // Importing useDispatch to dispatch actions to the Redux store
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/userSlice.js"; // Importing the updateStart action from the userSlice
import { toast } from "sonner"; // Importing the toast function from Sonner for displaying notifications
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { signOutSuccess } from "../../auth/redux/authSlice.js";
import { signOut } from "../../auth/api/authApi.js";
import { updateUser, deleteUser } from "../api/userApi.js";
import { Link } from "react-router-dom"; // Importing the Link component from React Router
import { getImageUrl } from "../../../utils/helpers/imageHelper";

const DashProfile = () => {
  // Accessing currentUser from the Redux store
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch(); // Accessing the dispatch function from the useDispatch hook
  // State for storing the selected image file
  const [uploadImage, setUploadImage] = useState(null);
  // State for storing the URL of the selected image for preview
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
  // state to make sure image upload is done
  const [ImageUploadDone, setImageUploadDone] = useState(false);

  // State for storing form data
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false); // State for showing the modal

  // Ref for accessing the file input element directly
  const filePickerref = useRef(null);

  // Function to handle image file selection
  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Getting the selected file
    if (file) {
      setUploadImage(file); // Setting the selected file in state
      setImageFileUrl(URL.createObjectURL(file)); // Creating a URL for the selected file to display a preview
    }
  };

  // useEffect to handle new image upload
  useEffect(() => {
    if (uploadImage) {
      // Code to upload the image to the server
      newImageUpload();
    }
  }, [uploadImage]); // Dependency array for the useEffect

  // Function to upload the new image to the server
  const newImageUpload = async () => {
    setImageUploadDone(true); // Setting the image upload status to false
    // Code to upload the image to the server
    setImageFileUploadingError(null); // Clearing any previous error

    // Validate file
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(uploadImage.type)) {
      setImageFileUploadingError(
        "Only JPG, JPEG, PNG, GIF, and WEBP files are allowed",
      );
      setImageFileUploadingProgress(null);
      setUploadImage(null);
      setImageFileUrl(null);
      setImageUploadDone(false);
      return;
    }

    if (uploadImage.size > maxSize) {
      setImageFileUploadingError("Image size should be less than 5MB");
      setImageFileUploadingProgress(null);
      setUploadImage(null);
      setImageFileUrl(null);
      setImageUploadDone(false);
      return;
    }

    // Simulate upload progress animation
    setImageFileUploadingProgress(0);
    const progressInterval = setInterval(() => {
      setImageFileUploadingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    // Complete the "upload" after animation
    setTimeout(() => {
      clearInterval(progressInterval);
      setImageFileUploadingProgress(100);
      toast.success("Image selected and ready to upload");
      setImageUploadDone(false);
    }, 1200);
  };

  // Function to handle form input change
  const handleChange = (e) => {
    // Code to handle form input change
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0 && !uploadImage) {
      return;
    }
    if (ImageUploadDone) {
      return;
    }

    try {
      dispatch(updateStart());

      // Create FormData to support file upload
      const formDataToSend = new FormData();

      // Add form data fields
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== undefined && formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add profile picture file if selected
      if (uploadImage) {
        formDataToSend.append("profilePicture", uploadImage);
      }

      const data = await updateUser(currentUser._id, formDataToSend);
      dispatch(updateSuccess(data.user)); // Ensure this is the correct structure
      toast.success(data.message);
    } catch (error) {
      dispatch(updateFailure(error.message || error));
      toast.error(error.message || error);
    }
  };

  // Function to handle user account deletion
  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const data = await deleteUser(currentUser._id);
      dispatch(deleteUserSuccess());
      toast.success(data.message);
    } catch (error) {
      dispatch(deleteUserFailure(error.message || error));
      toast.error(error.message || error);
    }
  };

  // Function to handle sign out
  const handleSignout = async () => {
    try {
      const { ok, data: dataRes } = await signOut();
      if (!ok) {
        toast.error(dataRes.message);
      } else {
        toast.success(dataRes.message);
        dispatch(signOutSuccess());
      }
    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3">
      {" "}
      {/* Container for profile form with padding and center alignment */}
      <h1 className="my-8 text-center font-semibold text-3xl ">Profile</h1>{" "}
      {/* Profile heading */}
      {/* Form container with vertical spacing */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          ref={filePickerref}
        />{" "}
        {/* Hidden file input for image upload */}
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerref.current.click()}
        >
          {/* progress bar  */}
          {imageFileUploadingProgress && (
            <CircularProgressbar
              value={imageFileUploadingProgress || 0}
              text={`${imageFileUploadingProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadingProgress / 100
                  })`,
                },
              }}
            />
          )}
          {/* Image display area with click event to trigger file input */}
          <img
            src={imageFileUrl || getImageUrl(currentUser.profilePicture)}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              imageFileUploadingProgress &&
              imageFileUploadingProgress < 100 &&
              "opacity-60"
            }`}
          />
          {/* Displaying the image, either from file upload or from current user profile picture */}
        </div>
        {imageFileUploadingError && (
          <Alert color="failure">{imageFileUploadingError}</Alert>
        )}{" "}
        {/* Alert for image upload error */}
        {/* Input for username with default value */}
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="px-4 py-2 w-full rounded border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-amber dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-300 dark:border-slate-600"
        />
        {/* Input for email with default value */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="px-4 py-2 w-full rounded border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-amber dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-300 dark:border-slate-600"
        />
        {/* Input for password */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          className="px-4 py-2 w-full rounded border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-amber dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-300 dark:border-slate-600"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 rounded bg-brand-navy text-white hover:bg-slate-800 transition-colors"
        >
          Update
        </button>
        {/* Button to submit the form */}
        {currentUser.isAdmin && (
          <Link to={"/dashboard?tab=createPost"}>
            <button
              type="button"
              className="w-full py-2 px-4 rounded border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
            >
              Create Post
            </button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        {" "}
        {/* Container for account management actions */}
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer underline"
        >
          Delete Account
        </span>{" "}
        {/* Link to delete account */}
        <span onClick={handleSignout} className="cursor-pointer underline">
          Sign Out
        </span>{" "}
        {/* Link to sign out */}
      </div>
      {/* Modal for delete account confirmation */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header /> {/* Modal header */}
        <Modal.Body>
          {" "}
          {/* Modal body */}
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />{" "}
            {/* Icon */}
            <h3 className="text-lg font-semibold mb-5 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>{" "}
            {/* Confirmation message */}
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                className="mr-2"
                onClick={handleDeleteUser}
              >
                Yes, I'm sure
              </Button>{" "}
              {/* Button to cancel account deletion */}
              <Button onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>{" "}
              {/* Button to confirm account deletion */}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashProfile; // Exporting the DashProfile component
