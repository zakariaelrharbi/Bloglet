import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PostsPage = () => {
    const { postSlug } = useParams();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                
            } catch (error) {
                
            }
        };
        fetchPost();
    }, [postSlug]);
  return (
    <div>
      
    </div>
  )
}

export default PostsPage



