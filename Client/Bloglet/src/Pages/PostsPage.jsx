import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const PostsPage = () => {
    const { postSlug } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/post/getAllPosts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch post');
                }
                setPost(data.posts[0]);
            } catch (error) {
                toast.error(error.message);
            }
        };
        fetchPost();
    }, [postSlug]);

    return (
        <div>
            <main className="mt-10">
                <div
                    className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
                    style={{ height: "24em" }}
                >
                    <div
                        className="absolute left-0 bottom-0 w-full h-full z-10"
                        style={{
                            backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.7))"
                        }}
                    />
                    {post?.image && (
                        <img
                            src={post.image}
                            className="w-full h-full object-cover"
                            alt={post.title}
                        />
                    )}
                    <div className="p-4 absolute bottom-0 left-0 z-20">
                        <Link
                            to={`/search?category=${post?.category}`}
                            className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2"
                        >
                            {post?.category}
                        </Link>
                        <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                            {post?.title}
                        </h2>
                        <div className="flex mt-3 items-center">
                            {post?.author && (
                                <>
                                    <img
                                        src={post.author.profilePicture || 'https://defaultuserimage.com/profile.png'}
                                        className="h-10 w-10 rounded-full"
                                        alt={post.author.username}
                                    />
                                    <div className="ml-3">
                                        <p className="font-semibold text-gray-200 text-sm">
                                            {post.author.username}
                                        </p>
                                        <p className="font-semibold text-gray-400 text-xs">
                                            {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                    <div 
                    className="post-content p-3 max-w-2xl mx-auto w-full"
                    dangerouslySetInnerHTML={{ __html: post?.content }} />
                </div>
            </main>
        </div>
    );
};

export default PostsPage;
