import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch('/api/flashcards');
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewCard({ ...newCard, [e.target.name]: e.target.value });
  };

  const handleAddCard = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      });
      setNewCard({ question: '', answer: '' });
      fetchCards();
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleDeleteCard = async (id) => {
    try {
      await fetch(`/api/flashcards/${id}`, { method: 'DELETE' });
      fetchCards();
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <h2>Admin Dashboard</h2>
      <form onSubmit={handleAddCard} className={styles.form}>
        <input
          name="question"
          value={newCard.question}
          onChange={handleInputChange}
          placeholder="Question"
          required
          className={styles.input}
        />
        <input
          name="answer"
          value={newCard.answer}
          onChange={handleInputChange}
          placeholder="Answer"
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Add Flashcard</button>
      </form>
      <ul className={styles.cardList}>
        {cards.map((card) => (
          <li key={card.id} className={styles.cardItem}>
            <span>{card.question} - {card.answer}</span>
            <button onClick={() => handleDeleteCard(card.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;