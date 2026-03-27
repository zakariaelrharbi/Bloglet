import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/imageHelper";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/post/getAllPosts?userId=${currentUser._id}`,
        );
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        toast.error("An error occurred while fetching posts");
      }
    };
    fetchPosts();
  }, [currentUser._id]);

  // Function to handle show more posts
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `http://localhost:5000/api/post/getAllPosts?userId=${currentUser._id}&startIndex=${startIndex}`,
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      toast.error("An error occurred while fetching posts");
    }
  };

  // Function to handle delete post
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `http://localhost:5000/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        setUserPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postIdToDelete),
        );
        navigate("/dashboard?tab=posts");
      }
    } catch (error) {
      toast.error("An error occurred while deleting post");
    }
  };
  return (
    <div className="overflow-x-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {userPosts.length > 0 ? (
        <>
          <table className="min-w-full border border-slate-200 dark:border-slate-700 shadow-md">
            <thead className="bg-slate-100 dark:bg-slate-900 text-left">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Date updated
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Post image
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Post Title
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Category
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Delete
                </th>
                <th className="px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {userPosts.map((post) => (
                <tr key={post._id} className="bg-white dark:bg-slate-800">
                  <td className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title}
                        className="w-24 h-14 object-cover bg-gray-500 rounded"
                      />
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/post/${post.slug}`}
                      className="font-medium text-slate-900 dark:text-slate-100"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-slate-600 dark:text-slate-300">
                    {post.category}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <Link to={`/dashboard?tab=updatePost&postId=${post._id}`}>
                      <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition-colors">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              className="w-full text-teal-500 py-4 text-md font-semibold hover:text-teal-700 transition-colors"
              onClick={handleShowMore}
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <div>
          <h1 className="text-2xl text-center font-bold min-h-screen pt-6">
            No posts yet
          </h1>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="w-full max-w-md rounded-lg bg-white dark:bg-slate-900 shadow-lg border border-slate-300 dark:border-slate-700 p-6">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-5 text-gray-700 dark:text-gray-200">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeletePost}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                >
                  Yes, I\'m sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashPosts;
