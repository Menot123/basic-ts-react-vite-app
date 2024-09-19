import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostList.css';

const PostList: React.FC = () => {
    const apiUrl: string = import.meta.env.VITE_API_URL as string;
    const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
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
            <Link to={`${originalPath}/create`} className="btn btn-primary">Create Post</Link>
            <div className="container">
                <div className="row">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td>User ID</td>
                                    <td>Post ID</td>
                                    <td>Title</td>
                                    <td>Body</td>
                                    <td>Edit</td>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPosts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.userId}</td>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>
                                        <td>
                                            <Link to={`${originalPath}/edit/${post.id}`} className="btn btn-warning">Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <br />

                    <div className="center">
                        <div className="pagination">
                            {page > 1 && (
                                <a onClick={() => paginate(page - 1)} href="#">&laquo;</a>
                            )}
                            {pageNumbers.map(number => (
                                <a key={number} onClick={() => paginate(number)} href="#" className={number === page ? 'active' : ''}>
                                    {number}
                                </a>
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

export default PostList;
