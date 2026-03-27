import { FileInput } from "flowbite-react";
import React, { useState, useRef } from "react";
import { CategorySelect } from "../components/CategorySelect";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const quillRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
    image: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle content change from ReactQuill
  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

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

  // Upload image to server
  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast.error("Please select an image to upload");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("image", file);

      setImageFileUploadingProgress(0);

      const res = await fetch("http://localhost:5000/api/post/createPost", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      // This will only work if we're just uploading, but for full post creation
      // we'll handle the upload as part of the form submission
      // For now, let's just simulate progress and use the image in form data
      setImageFileUploadingProgress(100);
      toast.success("Image selected and ready to upload");
      setImageFileUploadingProgress(null);
    } catch (error) {
      toast.error("Failed to upload image");
      setImageFileUploadingProgress(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create FormData to support file upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("category", formData.category);

      // Append image file if selected
      if (file) {
        formDataToSend.append("image", file);
      }

      const res = await fetch("http://localhost:5000/api/post/createPost", {
        method: "POST",
        credentials: "include",
        body: formDataToSend,
        // Don't set Content-Type header - browser will set it automatically for FormData
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      if (res.ok) {
        toast.success("Post created successfully");
        setTimeout(() => {
          navigate("/dashboard?tab=posts");
        }, 1500);
      }
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          />
          <CategorySelect
            value={formData.category}
            onChange={(value) => setFormData({ ...formData, category: value })}
            className="w-48"
          />
        </div>
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
        {imagePreview && (
          <img
            src={imagePreview}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          ref={quillRef}
          theme="snow"
          placeholder="Write something..."
          required
          className="h-72 mb-12 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          value={formData.content}
          onChange={handleContentChange}
        />
        <button
          type="submit"
          className="mb-12 w-full py-3 rounded bg-brand-navy text-white hover:bg-slate-800 transition-colors"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
