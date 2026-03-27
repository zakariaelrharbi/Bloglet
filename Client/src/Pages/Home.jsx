import React, { useState } from "react";
import { PostCard } from "../components/PostCard";
import { SidebarPostCard } from "../components/SidebarPostCard";
import { posts } from "../data/posts";
import { motion } from "framer-motion";
import HeroSection from "../components/HeroSection";

function Home() {
  // Split posts: first 9 for main grid (initially showing 6), remaining 6 for sidebar
  const mainPostsSource = posts.slice(0, 9);
  const sidebarPosts = posts.slice(9, 15);
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, mainPostsSource.length));
  };

  const visibleMainPosts = mainPostsSource.slice(0, visibleCount);
  const hasMore = visibleCount < mainPostsSource.length;

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg dark:bg-slate-900 transition-colors duration-300">
      <main className="flex-grow">
        <HeroSection />

        <div
          id="latest-blogs"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-brand-navy dark:text-white uppercase tracking-wider inline-block relative transition-colors">
              Latest Blogs
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-brand-amber rounded-full"></span>
            </h2>
          </div>

          {/* 2/3 Left Main Content + 1/3 Right Sidebar Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* LEFT MAIN CONTENT (2/3 width on desktop) */}
            <div className="w-full lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {visibleMainPosts.map((post, index) => (
                  <PostCard key={post.id} post={post} index={index} />
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={handleLoadMore}
                    className="px-8 py-3 rounded-full border-2 border-brand-navy dark:border-slate-600 text-brand-navy dark:text-white font-medium hover:bg-brand-navy dark:hover:bg-slate-700 hover:text-white transition-colors duration-300"
                  >
                    Load More
                  </motion.button>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR (1/3 width on desktop) */}
            <aside className="w-full lg:w-1/3">
              <div className="sticky top-24 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700/50 transition-colors duration-300">
                <h3 className="text-xl font-bold font-serif text-brand-navy dark:text-white mb-6 pb-2 border-b border-slate-200 dark:border-slate-700 transition-colors">
                  Trending Now
                </h3>
                <div className="flex flex-col gap-4">
                  {sidebarPosts.map((post, index) => (
                    <SidebarPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
