import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import dompurify
import { useSelector } from 'react-redux';

const OurBlog = () => {
  const [posts, setPosts] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/post/getAllPosts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        } else {
          toast.error('Failed to fetch posts');
        }
      } catch (error) {
        toast.error('An error occurred while fetching posts');
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="bg-white font-[sans-serif] my-6">
      <div className="max-w-7xl mx-auto">
        {posts && posts.length > 0 && (
          <>
            <div className="text-center">
              <h2 className="text-3xl py-2 font-extrabold text-[#333] inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-pink-400 after:rounded-full">
                LATEST BLOGS
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-md:max-w-lg mx-auto">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300"
                >
                  <Link to={`/post/${post.slug}`}>
                      <img src={post.image || 'https://via.placeholder.com/400x300'} alt={post.title} className='w-full h-60 object-cover' />
                    </Link>
                  <div className="p-6">
                    <span className="text-sm block text-gray-400 mb-2">
                      {new Date(post.createdAt).toLocaleDateString()} | BY {post.author || 'Unknown'}
                    </span>
                    <h3 className="text-xl font-bold text-[#333] overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      <Link to={`/post/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                    </h3>
                    <hr className="my-6" />
                    <p
                      className="text-gray-400 text-sm"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content.substring(0, 120) + '...') }}
                    >
                      {/* Truncate content for preview */}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className='text-center p-6'>
              <Link
                to={'/search'}
                className="text-xl text-teal-500 hover:underline"
              >
                View all posts
              </Link>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default OurBlog;
