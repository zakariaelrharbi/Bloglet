import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '', // Default empty values to avoid errors
    category: '',
    content: '',
    image: '',
  });
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  // Fetch post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/post/getAllPosts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || 'Failed to fetch post');
        }
        // Make sure formData gets the post data
        setFormData({
          title: data.posts[0].title || '',
          category: data.posts[0].category || '',
          content: data.posts[0].content || '',
          image: data.posts[0].image || '',
        });
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPost();
  }, [postId]);

  // Upload Image
  const handleUploadImage = async () => {
    if (!file) {
      toast.error('Please select an image to upload');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPG, JPEG, and PNG files are allowed');
      return;
    }

    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        toast.error('Failed to upload image');
        setImageFileUploadingProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          toast.success('Image uploaded successfully');
          setImageFileUploadingProgress(null);
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/post/update/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }
      toast.success('Post updated successfully');
      setTimeout(() => {
        navigate('/dashboard?tab=posts');
      }, 1500);
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Edit post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          {/* Title Input */}
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            value={formData.title || ''} // Ensure the title is displayed correctly
            className='flex-1'
          />

          {/* Category Select */}
          <Select
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            value={formData.category || ''} // Ensure the category is displayed correctly
          >
            <option value='' disabled>
              Select category
            </option>
            <option value='tech'>Tech</option>
            <option value='lifestyle'>Lifestyle</option>
            <option value='health'>Health</option>
            <option value='politics'>Politics</option>
            <option value='entertainment'>Entertainment</option>
          </Select>
        </div>

        {/* Image Upload & Display */}
        <div className='flex gap-4 items-center justify-between border-4 border-gray-300 border-dashed p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button type='button' outline onClick={handleUploadImage} disabled={Boolean(imageFileUploadingProgress)}>
            {imageFileUploadingProgress ? (
              <div style={{ width: '64px', height: '64px' }}>
                <CircularProgressbar value={imageFileUploadingProgress} text={`${imageFileUploadingProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {/* Displaying the uploaded image */}
        {formData.image && <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />}

        {/* Content (ReactQuill) */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          required
          className='h-72 mb-12'
          onChange={(content) => setFormData({ ...formData, content: content })}
          value={formData.content || ''}
        />

        {/* Submit Button */}
        <Button type='submit' className='mb-12'>
          Update post
        </Button>
      </form>
    </div>
  );
};

export default UpdatePost;
