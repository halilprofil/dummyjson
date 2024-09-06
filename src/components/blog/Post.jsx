import React, { useEffect, useState } from "react";
import { fetchBlogByPage, fetchComments, fetchUsers } from "../../services/blog";
import { Pagination } from "../pagination/Pagination";
import { useFetch } from "../../hooks/useFetch";
import { Spinner } from "../base/Spinner";
import { SearchBar } from "../searchbar/SearchBar";

export const Post = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { loading, data, error } = useFetch(() => fetchBlogByPage(page, limit), [page]);
  const { data: userData } = useFetch(() => fetchUsers(), []);
  const { data: commentsData } = useFetch(() => fetchComments(), []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    if (data && userData && commentsData) {
      const extendedData = data.posts.map((post) => {
        const user = userData.users.find((user) => user.id === post.userId);
        const comments = commentsData.comments.filter((comment) => comment.postId === post.id);
        return { ...post, user: user, comments };
      });

      if (!searchTerm) {
        setFilteredData(extendedData);
      } else {
        setFilteredData(
          extendedData.filter((post) =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    }
  }, [searchTerm, data, userData, commentsData]);

  useEffect(() => {
    
    const path = window.location.pathname;
    const postId = path.split("/posts/")[1];
    if (postId && filteredData.length > 0) {
      const post = filteredData.find((post) => post.id === parseInt(postId));
      setSelectedPost(post);
    }
  }, [filteredData]);

  const handlePostClick = (id) => {
  
    window.history.pushState({}, "", `/blog/${id}`);
    const post = filteredData.find((post) => post.id === id);
    setSelectedPost({ ...post });
  };

  return (
    <>
      <div className="container">
  
        {!selectedPost && (
          <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <div className="recipes-container">
              {filteredData.length > 0 && !loading
                ? filteredData.map((post) => (
                    <div onClick={() => handlePostClick(post.id)} className="recipes-item" key={post.id}>
                      <img width={50} src={post.user.image} alt={post.user.firstName} />
                      <h3>{post.user.firstName + " " + post.user.lastName}</h3>
                      <p>{post.title}</p>
                    </div>
                  ))
                : !loading && !selectedPost && "İçerik bulunamadı"}
            </div>
          </>
        )}

      
        {selectedPost && (
          <div className="post-details">
            <h1>{selectedPost.title}</h1>
            <h3>By: {selectedPost.user.firstName} {selectedPost.user.lastName}</h3>
            <p>{selectedPost.body}</p>

            {selectedPost.comments.map((comment) => (
              <div key={comment.id}>
                {/* <img src={comment.user.image} /> */}
                <h4>{comment.user.username}</h4>
                <span>{comment.body} </span>
                <span>Likes: {comment.likes}</span>
              </div>
            ))}
            <h3> Likes : {selectedPost.reactions.likes}</h3>
            <h3> Dislikes : {selectedPost.reactions.dislikes}</h3>
            <button onClick={() => { window.history.pushState({}, "", "/blog"); setSelectedPost(null); }}>
              Geri Dön
            </button>
          </div>
        )}
      </div>

      {loading && <Spinner />}
      {error && <div>Error...</div>}
      {data && <Pagination page={page} setPage={setPage} limit={limit} total={data.total} />}
    </>
  );
};

