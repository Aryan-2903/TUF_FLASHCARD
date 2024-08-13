import React, { useState } from 'react';
import styles from './Flashcard.module.css';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.flashcard} onClick={handleFlip}>
      <div className={`${styles.flashcardInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.flashcardFront}>
          <p>{card.question}</p>
        </div>
        <div className={styles.flashcardBack}>
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
