import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';

const EditPost: React.FC = () => {
    // const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
    const { id } = useParams<{ id: string }>();

    return (
        <div>
            <h2>Edit Post {id}</h2>

        </div>
    );
};

export default EditPost;
