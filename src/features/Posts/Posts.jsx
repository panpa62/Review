import React from "react";
import { useFetchPostsQuery } from "./postSlice";

const Posts = () => {
  const { data, error, isLoading } = useFetchPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error}</div>;

  return (
    <div className="'post-container">
      {data.data.posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          <p>{post.location}</p>
          <p>Posted By: {post.author.username}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
