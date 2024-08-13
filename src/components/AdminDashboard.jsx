import React, { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ Question: '', Answer: '' });

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
          const response = await fetch('https://tyf-backend-seven.vercel.app/api/all');
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
    await fetch('https://tyf-backend-seven.vercel.app/api/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: newCard.Question, answer: newCard.Answer }),
    });
    setNewCard({ Question: '', Answer: '' });
    fetchCards();
  } catch (error) {
    console.error('Error adding card:', error);
  }
};

  const handleDeleteCard = async (id) => {
  try {
    await fetch(`https://tyf-backend-seven.vercel.app/api/card/${id}`, { method: 'DELETE' });
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
          name="Question"
          value={newCard.Question}
          onChange={handleInputChange}
          placeholder="Question"
          required
          className={styles.input}
        />
        <input
          name="Answer"
          value={newCard.Answer}
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
            <span>{card.Question} - {card.Answer}</span>
            <button onClick={() => handleDeleteCard(card.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
