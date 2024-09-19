import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const App: React.FC = () => {
  const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;
  return (
    <Routes>
      <Route path={`${originalPath}/`} element={<PostList />} />
      <Route path={`${originalPath}/create`} element={<CreatePost />} />
      <Route path={`${originalPath}/edit/:id`} element={<EditPost />} />
    </Routes>
  );
};

export default App;
