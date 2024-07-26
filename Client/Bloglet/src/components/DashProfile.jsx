import { Button, TextInput } from 'flowbite-react'
import React, {useState} from 'react'
import { useSelector } from 'react-redux'

const DashProfile = () => {
  const currentUser = useSelector((state) => state.user.currentUser)
  const [uploadImage, setUploadImage] = useState(null)
  const [ imageFileUrl, setImageFileUrl ] = useState(null)
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if(file){
      setUploadImage(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  }
  console.log(uploadImage, imageFileUrl)

  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='mb-3 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept='image/*' onChange={handleImageUpload} className='' />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
          className='rounded-full w-full h-full object-cover border-8 border-[#acacab]' />
        </div>
        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' className=''>Update</Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default DashProfile
