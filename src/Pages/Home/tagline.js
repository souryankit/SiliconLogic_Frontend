import React, { useState, useEffect } from 'react';

const SequentialWords = () => {
  const words = ['Involve', 'Improve', 'Innovate'];
  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    const showWords = async () => {
      setVisibleWords([]);
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setVisibleWords(prev => [...prev, i]);
      }
    };

    showWords();
    const interval = setInterval(showWords, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" flex ">
      <div className="flex items-center">
        {words.map((word, index) => (
          <div
            key={word}
            className="relative mx-2 h-2 overflow-hidden"
            style={{
              fontSize: '36px',
              fontWeight: '500',
              opacity: visibleWords.includes(index) ? 1 : 0,
              transition: 'opacity 0.5s ease',
              animation: visibleWords.includes(index) 
                ? `slideIn 0.7s ease forwards ${index * 0.3}s` 
                : 'none'
            }}
          >
            <div className="relative">
              <span
                className="text-5xl font-bold inline-block"
                style={{
                  background: `linear-gradient(45deg, 
                    ${index === 0 ? '#ff6b6b, #ff8e8e' : 
                      index === 1 ? '#4ecdc4, #45b7d1' : 
                      '#9f7aea, #b794f4'}
                  )`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {word}
              </span>
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: 'linear-gradient(to right, #111827 50%, transparent 50%)',
                  backgroundSize: '200% 100%',
                  animation: visibleWords.includes(index) 
                    ? `swipeReveal 0.7s ease forwards ${index * 0.3 + 0.2}s` 
                    : 'none',
                  zIndex: 1
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes swipeReveal {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }

        .relative {
          position: relative;
        }

        .mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }

        .overflow-hidden {
          overflow: hidden;
        }

        .flex {
          display: flex;
        }

        .items-center {
          align-items: center;
        }

        .justify-center {
          justify-content: center;
        }

        .bg-gray-900 {
          background-color: #111827;

       
      `}</style>
    </div>
  );
};

export default SequentialWords;