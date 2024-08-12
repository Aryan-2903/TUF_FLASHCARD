import express from 'express';
import db from './db.js';
import cors from 'cors'; 
import connection from './db.js';

const app = express();
app.use(express.json());
app.use(cors());

// Get all flashcards
app.get('/api/flashcards', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM flashcards');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new flashcard
app.post('/api/flashcards', async (req, res) => {
  const { question, answer } = req.body;
  try {
    const [result] = await db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer]);
    res.status(201).json({ id: result.insertId, question, answer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a flashcard
app.delete('/api/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM flashcards WHERE id = ?', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(3000, ()=>{
    console.log('Server running on port 3000');
    

});