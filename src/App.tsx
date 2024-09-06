import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const apiUrl: string = import.meta.env.VITE_API_URL as string;
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  useEffect(() => {
    const checkPage = async () => {
      try {
        if (page < 1) {
          setPage(1);
        }
      } catch (error) {
        console.error('Error checking page:', error);
      }
    };

    checkPage();
  }, [page]);

  const indexOfLastPost: number = page * limit;
  const indexOfFirstPost: number = indexOfLastPost - limit;
  const currentPosts: any[] = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(posts.length / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h2>Post from <code>{apiUrl}</code></h2>
      <div className="container">
        <div className="row">
          <div className="table-responsive" data-pattern="priority-columns">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <td>User ID</td>
                  <td>Post ID</td>
                  <td>Title</td>
                  <td>Body</td>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map(post => (
                  <tr key={post.id}>
                    <td>{post.userId}</td>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br />

          <div className="center">
            <div className="pagination">
              {page > 1 && (
                <a onClick={() => paginate(page - 1)} href={'#'}>&laquo;</a>
              )}
              {pageNumbers.map(number => (
                <a key={number} onClick={() => paginate(number)} href="#" className={number === page ? 'active' : ''}>{number}</a>
              ))}
              {page < pageNumbers[pageNumbers.length - 1] && (
                <a onClick={() => paginate(page + 1)} href="#">&raquo;</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;