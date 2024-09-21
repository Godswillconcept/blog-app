/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

function BlogPosts({ axiosInstance }) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/posts");
      setPosts(response.data.posts);
    } catch (error) {
      console.error(
        "Failed to fetch posts:",
        error.response ? error.response.data.error : error.message
      );
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  // delete and edit functions (update as needed)
  const handleDelete = async (postId) => {
    try {
      const response = await axiosInstance.delete(`/posts/${postId}/delete`);
      console.log(response.data);
      fetchPosts();
    } catch (error) {
      console.error(
        "Failed to delete post:",
        error.response ? error.response.data.error : error.message,
        setError(error.response ? error.response.data.error : error.message)
      );
    }
  };

  const handleEdit = (post) => {
    navigate(`${post.id}/edit-post`, { state: { post } });
  };

  const handlePublishChange = async (postId, published) => {
    try {
      await axiosInstance.put(`/posts/${postId}/publish`, { published });
      fetchPosts();
    } catch (error) {
      console.error(
        "Failed to update publish status:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5">
      <h1 className="text-3xl font-semibold text-center mb-6">Blog Posts</h1>
      <p className="text-base font-normal text-red-600">{error}</p>
      {posts.length !== 0 ? (
        <div>
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md mb-5 relative"
            >
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="text-blue-500 hover:text-blue-600"
                  title="Edit Post"
                >
                  <AiFillEdit size={24} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete Post"
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-3">{post.content}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  Author: {post.author ? post.author.username : "Unknown"}
                </span>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="text-sm font-medium">Published:</span>
                  <input
                    type="checkbox"
                    checked={post.published}
                    onChange={() =>
                      handlePublishChange(post.id, !post.published)
                    }
                    className="rounded focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center ">
          No Post
          <Link
            to="/create-post"
            className="text-red-400 underline font-medium px-4"
          >
            Create Post
          </Link>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button className="rounded-md bg-red-600 text-white px-4 py-2 hover:bg-red-800">
          <Link to="/create-post">New Post</Link>
        </button>
      </div>
    </div>
  );
}

export default BlogPosts;
