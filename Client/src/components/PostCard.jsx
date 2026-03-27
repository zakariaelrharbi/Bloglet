import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getImageUrl } from "../utils/imageHelper";

export function PostCard({ post, index }) {
  return (
    <Link to={`/post/${post.id}`} className="block h-full outline-none">
      <motion.article
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
        }}
        className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-black/40 transition-all duration-300 group flex flex-col h-full border border-slate-100 dark:border-slate-700"
      >
        <div className="relative aspect-video overflow-hidden">
          <img
            src={getImageUrl(post.imageUrl || post.image)}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-brand-navy dark:text-white transition-colors">
            {post.category}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center space-x-1 transition-colors">
            <span>{post.date}</span>
            <span>|</span>
            <span className="font-medium">BY {post.author}</span>
          </div>

          <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3 line-clamp-2 group-hover:text-brand-amber dark:group-hover:text-brand-amber transition-colors">
            {post.title}
          </h3>

          <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 flex-grow transition-colors">
            {post.excerpt}
          </p>
        </div>
      </motion.article>
    </Link>
  );
}
