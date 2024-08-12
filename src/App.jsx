import React from 'react';
import FlashcardList from './components/FlashcardList';
import AdminDashboard from './components/AdminDashboard';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Flashcard Learning Tool</h1>
      <FlashcardList />
      <AdminDashboard />
    </div>
  );
};

export default App;