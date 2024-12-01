import { Table, Modal, Button } from 'flowbite-react'
import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';


const DashPosts = () => {

  const { currentUser } = useSelector((state) => state.user)
  const [userPosts, setUserPosts] = useState([])
  const [showMore, setShowMore] = useState(true)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/post/getAllPosts?userId=${currentUser._id}`)
        const data = await res.json()
        if(res.ok) {
          setUserPosts(data.posts)
          if(data.posts.length < 9) {
            setShowMore(false)

          }
        }
        
      } catch (error) {
        toast.error('An error occurred while fetching posts')
      }
    }
    fetchPosts();
    }, [currentUser._id]);

    // Function to handle show more posts
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`http://localhost:5000/api/post/getAllPosts?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data = await res.json();
      if(res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if(data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error('An error occurred while fetching posts')
    }
  }

  // Function to handle delete post
  const handleDeletePost = async () => {
    setShowModal(false)
    try {
      const res = await fetch(`http://localhost:5000/api/post/deletePost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      })
      const data = await res.json()
      if(!res.ok) {
        toast.error(data.message)
      }else {
        toast.success(data.message)
        setUserPosts((prevPosts) => prevPosts.filter((post) => post._id !== postIdToDelete))
        navigate('/dashboard?tab=posts')
      }
    } catch (error) {
      toast.error('An error occurred while deleting post')
    }
  }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto  scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md min-h-screen'>
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {userPosts.map((post) => (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title} className='w-24 h-14 object-cover bg-gray-500' />
                    </Link>
                  </Table.Cell>
                  
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`} className='font-medium text-gray-900 dark:text-white'>
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <button 
                      onClick={() => {
                        setShowModal(true)
                        setPostIdToDelete(post._id)
                      }
                      }
                     className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete</button>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${post._id}`}>
                      <button className='bg-blue-500 text-white px-2 py-1 rounded-md'>Edit</button>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button className='w-full  text-teal-500 self-center py-7 text-md font-semibold' 
            onClick={handleShowMore}
            >Show More</button>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-bold min-h-screen pt-6">No posts yet</h1>
        </div>
      )
      }
      <Modal 
        show={showModal} 
        onClose={()=>setShowModal(false)}
        popup
        size='md'
        >
        <Modal.Header/> {/* Modal header */}
        <Modal.Body> {/* Modal body */}
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/> {/* Icon */}
            <h3 className='text-lg font-semibold mb-5 text-gray-500 dark:text-gray-400'>Are you sure you want to delete this post?</h3> {/* Confirmation message */}
            <div className='flex justify-center gap-4'> 
              <Button color='failure' className='mr-2' onClick={handleDeletePost}>Yes, I'm sure</Button> {/* Button to cancel account deletion */}
              <Button onClick={()=>setShowModal(false)}>No, Cancel</Button> {/* Button to confirm account deletion */}
            </div>
          </div>
        </Modal.Body>
      </Modal> 
    </div>
  )
}

export default DashPosts
