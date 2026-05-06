import { FileInput } from "flowbite-react";
import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { CategorySelect } from "../features/post/components/CategorySelect";
import { updatePost, getPosts } from "../features/post/api/postApi";

const UpdatePost = ({ postId: propPostId }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "", // Default empty values to avoid errors
    category: "",
    content: "",
    image: "",
    _id: "",
  });
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const navigate = useNavigate();
  const { postId: routePostId } = useParams();
  const postId = propPostId || routePostId;
  const { currentUser } = useSelector((state) => state.auth);
  const quillRef = useRef(null);

  // Fetch post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPosts({ postId });
        // Make sure formData gets the post data
        setFormData({
          title: data.posts[0].title || "",
          category: data.posts[0].category || "",
          content: data.posts[0].content || "",
          image: data.posts[0].image || "",
          _id: data.posts[0]._id || "",
        });
        // Set preview if image exists
        if (data.posts[0].image) {
          const imageSrc = data.posts[0].image.startsWith("http")
            ? data.posts[0].image
            : `http://localhost:5000/${data.posts[0].image}`;
          setImagePreview(imageSrc);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  // Handle file selection with preview
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Upload image preview
  const handleUploadImage = async () => {
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/gif",
      "image/webp",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, GIF, and WEBP files are allowed");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setImageFileUploadingProgress(100);
    toast.success("Image selected and ready to upload");
    setImageFileUploadingProgress(null);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    try {
      // Create FormData to support file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);

      // Append image file if selected, otherwise keep existing image
      if (file) {
        formDataToSend.append("image", file);
      }

      const data = await updatePost(formData._id, formDataToSend);
      toast.success("Post updated successfully");
      setTimeout(() => {
        navigate("/dashboard?tab=posts");
      }, 1500);
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">Edit post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="flex-1 px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />

          {/* Category Select */}
          <CategorySelect
            value={formData.category || ""}
            onChange={(value) => setFormData({ ...formData, category: value })}
            className="w-48"
          />
        </div>

        {/* Image Upload & Display */}
        <div className="flex gap-4 items-center justify-between border-4 border-gray-300 border-dashed p-3">
          <FileInput type="file" accept="image/*" onChange={handleFileChange} />
          <button
            type="button"
            onClick={handleUploadImage}
            disabled={!file || Boolean(imageFileUploadingProgress)}
            className="px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-brand-navy text-white hover:bg-slate-800 disabled:bg-slate-400 transition-colors"
          >
            {imageFileUploadingProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageFileUploadingProgress}
                  text={`${imageFileUploadingProgress || 0}%`}
                />
              </div>
            ) : (
              "Preview Image"
            )}
          </button>
        </div>

        {/* Displaying the uploaded/selected image */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        {/* Content */}
        <textarea
          name="content"
          placeholder="Write something..."
          required
          value={formData.content || ""}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className="w-full min-h-[18rem] mb-12 px-4 py-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-navy outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mb-12 w-full py-3 rounded bg-brand-navy text-white hover:bg-slate-800 transition-colors"
        >
          Update post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
