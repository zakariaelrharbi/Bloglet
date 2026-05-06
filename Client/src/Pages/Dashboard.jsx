import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashSideBar from "../features/user/components/DashSideBar.jsx";
import DashProfile from "../features/user/components/DashProfile.jsx";
import DashPosts from "../features/post/components/DashPosts.jsx";
import CreatePosts from "./CreatePosts";
import UpdatePost from "./UpdatePost";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const postIdFromUrl = urlParams.get("postId");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      setTab("profile"); // Set a default tab if none is specified
    }

    if (postIdFromUrl) {
      setPostId(postIdFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Side bar */}
      <div className="md:w-56">
        <DashSideBar />
      </div>
      {/* Main Content */}
      <div className="w-full">
        {tab === "profile" && <DashProfile />}
        {tab === "posts" && <DashPosts />}
        {tab === "createPost" && <CreatePosts />}
        {tab === "updatePost" && postId && <UpdatePost postId={postId} />}
      </div>
    </div>
  );
}
