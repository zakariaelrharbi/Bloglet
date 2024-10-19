import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const PostPage = () => {
    const { postSlug } = useParams();
    useEffect(() => {
        console.log(postSlug);
    }, [postSlug]);
  return (
    <div>
      
    </div>
  )
}

export default PostPage
