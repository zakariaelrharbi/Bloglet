import { Select, TextInput } from 'flowbite-react'
import React from 'react'

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
      </form>
    </div>
  )
}

export default CreatePost
