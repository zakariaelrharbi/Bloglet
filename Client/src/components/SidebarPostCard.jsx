import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function SidebarPostCard({ post, index }) {
  return (
    <Link to={`/post/${post.id}`} className="block outline-none">
      <motion.article
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          duration: 0.4,
          delay: index * 0.1,
        }}
        className="flex gap-4 group cursor-pointer p-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
      >
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs text-brand-amber font-medium mb-1">
            {post.category}
          </div>
          <h4 className="text-sm font-bold text-brand-navy dark:text-white line-clamp-2 mb-2 group-hover:text-brand-amber dark:group-hover:text-brand-amber transition-colors">
            {post.title}
          </h4>
          <div className="text-xs text-slate-500 dark:text-slate-400 transition-colors">
            {post.date}
          </div>
        </div>
      </motion.article>
    </Link>
  )
}