import { TextInput } from 'flowbite-react'
import React from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='mb-3 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={currentUser.profilePicture} alt="user" 
          className='rounded-full w-full h-full object-cover border-8 border-[#acacab]' />
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
      </form>
    </div>
  )
}

export default DashProfile
