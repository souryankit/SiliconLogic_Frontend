import React, { useState, useEffect } from 'react';


const VisionAnimation = () => {
  const words = ['Technology', 'Dream', 'Inspire', 'Creative', 'Think', 'Education'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [letterClasses, setLetterClasses] = useState(
    words.map(word => word.split('').map(() => ''))
  );

  useEffect(() => {
    const animateWord = () => {
      const newClasses = words[currentWordIndex].split('').map((_, index) => 'word-letter active');
      
      setLetterClasses(prevClasses => {
        const updatedClasses = [...prevClasses];
        updatedClasses[currentWordIndex] = newClasses;
        return updatedClasses;
      });

      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 3500);
    };

    animateWord();
  }, [currentWordIndex,]);

  return (
    <div className="word-container">
      <div className="word-text">
        {words[currentWordIndex].split('').map((letter, index) => (
          <span 
            key={index} 
            className={`word-letter ${letterClasses[currentWordIndex][index]}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default VisionAnimation;