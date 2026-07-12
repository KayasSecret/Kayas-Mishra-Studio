import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentAlt, FaTimes, FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi, I'm Kayas's assistant! Ask me anything about Kayas's experience, projects, skills, or location."
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    if (!textToSend) setInputValue('');

    // 1. Add user message
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setLoading(true);

    try {
      // 2. REST API call to Express chatbot endpoint
      const response = await axios.post('http://localhost:5000/api/chat', { message: text });
      
      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: response.data.reply }
      ]);
    } catch (err) {
      console.error(err);
      
      // Local fallback to ensure bot never breaks
      let localFallback = "I'm sorry, I am currently disconnected from the server. You can write to Kayas directly at kayasmishra.dev@gmail.com!";
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('languages')) {
        localFallback = "Kayas specializes in the MERN Stack: MongoDB, Express, React, and Node.js. He also knows PostgreSQL, Redis, Docker, and Git.";
      } else if (lowerText.includes('project') || lowerText.includes('work')) {
        localFallback = "Kayas has built several major projects including: 'Zenith Workspace' (real-time canvas), 'Verdant Analytics' (carbon tracker), and 'Aura Audio' (web visualizer).";
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire')) {
        localFallback = "You can contact Kayas directly at: kayasmishra.dev@gmail.com or visit his LinkedIn: linkedin.com/in/kayasmishra";
      } else if (lowerText.includes('experience') || lowerText.includes('job')) {
        localFallback = "Kayas is a Full Stack Engineer at Vivid Labs and was previously a Frontend intern at Pixel Craft.";
      }

      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: localFallback }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestions = [
    { label: 'Skills', query: 'What are your skills?' },
    { label: 'Projects', query: 'Tell me about your projects' },
    { label: 'Experience', query: 'Where have you worked?' },
    { label: 'Contact', query: 'How can I contact you?' }
  ];

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-gold)',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.4rem',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(245, 166, 35, 0.4)',
          zIndex: 999,
          border: 'none',
          outline: 'none'
        }}
        aria-label="Toggle assistant"
      >
        {isOpen ? <FaTimes /> : <FaCommentAlt />}
      </motion.button>

      {/* Slide-Up Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '2rem',
              width: 'min(calc(100vw - 4rem), 380px)',
              height: '480px',
              backgroundColor: 'rgba(27, 39, 69, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderRadius: '16px',
              border: 'var(--glass-border)',
              boxShadow: 'var(--glass-shadow)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 998,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div 
              style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'rgba(0, 0, 0, 0.15)'
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2ecc71' }} />
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', color: '#FFFFFF', fontSize: '0.95rem', fontWeight: '700' }}>
                  Kayas's Assistant
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
                  Ask questions about Kayas
                </span>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div 
              style={{
                flexGrow: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
              className="chat-log"
            >
              {messages.map((m, index) => {
                const isBot = m.sender === 'bot';
                return (
                  <div 
                    key={index}
                    style={{
                      alignSelf: isBot ? 'flex-start' : 'flex-end',
                      maxWidth: '80%',
                      padding: '0.75rem 1rem',
                      borderRadius: isBot ? '12px 12px 12px 2px' : '12px 12px 2px 12px',
                      backgroundColor: isBot ? 'rgba(255, 255, 255, 0.05)' : 'var(--accent-gold)',
                      color: isBot ? '#FFFFFF' : '#000000',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                      border: isBot ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
                    }}
                  >
                    {m.text}
                  </div>
                );
              })}

              {/* Typing Loader */}
              {loading && (
                <div 
                  style={{
                    alignSelf: 'flex-start',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px 12px 12px 2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span className="dot" />
                  <span className="dot" style={{ animationDelay: '0.2s' }} />
                  <span className="dot" style={{ animationDelay: '0.4s' }} />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length === 1 && (
              <div 
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0 1.5rem 1rem 1.5rem',
                  flexWrap: 'wrap'
                }}
              >
                {suggestions.map((s, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(s.query)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                    className="suggest-btn"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Footer */}
            <div 
              style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                gap: '0.75rem',
                backgroundColor: 'rgba(0, 0, 0, 0.15)'
              }}
            >
              <input
                type="text"
                placeholder="Ask about Kayas..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                style={{
                  flexGrow: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#FFFFFF',
                  fontSize: '0.9rem'
                }}
                className="chat-input"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputValue.trim()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  backgroundColor: inputValue.trim() ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.05)',
                  color: inputValue.trim() ? '#000000' : 'rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'default',
                  border: 'none',
                  outline: 'none',
                  transition: 'var(--transition-fast)'
                }}
              >
                <FaPaperPlane style={{ fontSize: '0.85rem' }} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .chat-log::-webkit-scrollbar {
          width: 6px;
        }
        .chat-log::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-log::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .suggest-btn:hover {
          border-color: var(--accent-gold);
          color: var(--accent-gold);
          background-color: rgba(245, 166, 35, 0.03);
        }
        .chat-input:focus {
          border-color: var(--accent-gold) !important;
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #FFFFFF;
          animation: chat-bounce 1.4s infinite ease-in-out both;
        }
        @keyframes chat-bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
}
