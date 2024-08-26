import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
            <TextInput type='text' placeholder='Title' required id='title'
            className='flex-1'/>
            <Select>
              <option value='uncategorized'>Select category</option>
              <option value='tech'>Tech</option>
              <option value='lifestyle'>Lifestyle</option>
              <option value='health'>Health</option>
              <option value='politics'>Politics</option>
              <option value='entertainment'>Entertainment</option>
            </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-gray-300 border-dashed p-3'>
          <FileInput type='file' accept='image/*' />
          <Button type='button' outline >Upload Image</Button>
        </div>
        <ReactQuill theme='snow' placeholder='Write something...' className='h-72 mb-12'/>
        <Button type='submit'>Publish</Button>
      </form>
    </div>
  )
}

export default CreatePost
