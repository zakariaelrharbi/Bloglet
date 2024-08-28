import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'sonner'; 
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'uncategorized',
    content: '',
    image: '',
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

  // Upload image to firebase storage
  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast.error('Please select an image to upload');
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
    } catch (error) {
      toast.error('Failed to upload image');
      setImageFileUploadingProgress(null);
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic, e.g., sending formData to a backend API
    try {
      const res = await fetch('http://localhost:5000/api/post/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok) {
        toast.error(data.message);
        return;
      }
      if(res.ok) {
        toast.success('Post created successfully');
        // navigate(`/post/${data.post.slug}`);
        setTimeout(() => {
          navigate('/dashboard?tab=posts');
        }, 1500);
      }

    } catch (error) {
      toast.error('Failed to create post');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput 
            type='text' 
            placeholder='Title' 
            required 
            id='title' 
            name='title' 
            value={formData.title}
            onChange={handleInputChange}
            className='flex-1'
          />
          <Select 
            name='category' 
            value={formData.category} 
            onChange={handleInputChange}
          >
            <option value='uncategorized'>Select category</option>
            <option value='tech'>Tech</option>
            <option value='lifestyle'>Lifestyle</option>
            <option value='health'>Health</option>
            <option value='politics'>Politics</option>
            <option value='entertainment'>Entertainment</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-300 border-dashed p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button 
            type='button' 
            outline 
            onClick={handleUploadImage} 
            disabled={Boolean(imageFileUploadingProgress)}
          >
            {imageFileUploadingProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageFileUploadingProgress} text={`${imageFileUploadingProgress || 0}%`} />
              </div>
            ) : 'Upload Image'}
          </Button>
        </div>
        {formData.image && (
          <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />
        )}
        <ReactQuill 
          theme='snow' 
          placeholder='Write something...' 
          required 
          className='h-72 mb-12' 
          value={formData.content} 
          onChange={handleContentChange}
        />
        <Button type='submit' className='mb-12'>
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
