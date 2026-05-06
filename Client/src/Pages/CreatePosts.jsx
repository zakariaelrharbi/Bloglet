import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import { CategorySelect } from "../features/post/components/CategorySelect";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/post/api/postApi";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] =
    useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
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

  // Preview image locally
  const handleUploadImage = async () => {
    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    // For preview, just set the image preview without uploading to server
    setImagePreview(URL.createObjectURL(file));
    toast.success("Image selected and ready to upload");
    setImageFileUploadingProgress(null);
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

      const data = await createPost(formDataToSend);
      toast.success("Post created successfully");
      setTimeout(() => {
        navigate("/dashboard?tab=posts");
      }, 1500);
    } catch (error) {
      toast.error(error.message || "Failed to create post");
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
        <textarea
          name="content"
          placeholder="Write something..."
          required
          value={formData.content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="w-full min-h-[18rem] mb-12 px-4 py-3 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-navy outline-none"
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
