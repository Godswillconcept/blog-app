/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost({ axiosInstance }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreatePost = async () => {
    try {
      if (!title || !content) {
        setError("Title and content are required");
        return;
      }

      const newPostData = { title, content, published };
      await axiosInstance.post("/posts", newPostData);

      setTitle("");
      setContent("");
      setPublished(false);
      setError("");
      navigate("/posts");
    } catch (error) {
      setError("Failed to create post");
      console.error(
        "Failed to create post:",
        error.response ? error.response.data.error : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create a New Post
        </h2>
        {error && <p className="text-red-600">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your post title"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Content:
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here"
              rows="6"
            />
          </div>
          <div className="flex items-center">
            <input
              id="published"
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="published"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Published
            </label>
          </div>
          <button
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            onClick={handleCreatePost}
          >
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
