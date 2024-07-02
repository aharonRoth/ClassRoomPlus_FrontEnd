// Chatbot.jsx
import React, { useState, useEffect } from 'react';
import { fetchQuestion, submitResponse } from '../../api';
import Question from './Question';
import './chatbot.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Chatbot = ({ onNavigateToCourse }) => {
  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(1);
  const [url, setUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Using useNavigate instead of useHistory

  const getPageIdentifier = (pathname) => {
    if (pathname.includes('dashboard')) return 'dashboard';
    if (pathname.includes('contentsClass')) return 'contentsClass';
    if (pathname.includes('verifi')) return 'verifi';
    return 'home';
  };

  const page = getPageIdentifier(location.pathname);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchQuestion(page, questionId);
      setQuestion(response.data);
    } catch (error) {
      console.error('Error fetching question:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [questionId, location.pathname]);

  const handleOptionClick = async (optionId) => {
    setLoading(true);
    try {
      const response = await submitResponse(page, question.id, optionId);

      if (response.data.nextQuestion) {
        setQuestionId(response.data.nextQuestion.id);
      } else if (response.data.courseId) {
        onNavigateToCourse(response.data.courseId);
      } else if (response.data.url) {
        setUrl(response.data.url);
        navigate(response.data.url); // Use navigate for navigation
      } else {
        console.error('No nextQuestionId, courseId, or URL in response:', response.data);
      }
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div>
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <i className="fas fa-comment"></i>
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <h1>I'm chaty</h1>
          <h2 className="question-title">{question?.greeting}</h2>
          {loading ? (
            <div>Loading...</div>
          ) : url ? (
            <div>Redirecting to <a href={url}>{url}</a></div>
          ) : question ? (
            <Question question={question} onOptionClick={handleOptionClick} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
