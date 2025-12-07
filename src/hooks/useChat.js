import { useState, useEffect } from 'react';
import { triggerHaptic } from '../utils/triggerHaptic';

const API_URL = 'https://ai-backend-2.vercel.app/api/chat';
const API_KEY = 'AI-Laksh123';

export const useChat = () => {
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const stored = localStorage.getItem('auroraChatMessages');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [userId, setUserId] = useState(() => {
    try { return localStorage.getItem('auroraUserId') || ''; } catch { return ''; }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      const newId = 'user-' + Date.now();
      setUserId(newId);
      localStorage.setItem('auroraUserId', newId);
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem('auroraChatMessages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const addMessage = (msg) => {
    setChatMessages((prev) => [...prev, msg]);
  };

  // --- NEW: LOGIC TO DETECT CARD TYPE ---
  const detectCardTrigger = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('built')) return 'project';
    if (lowerText.includes('experience') || lowerText.includes('job') || lowerText.includes('intern')) return 'experience';
    if (lowerText.includes('stack') || lowerText.includes('tech') || lowerText.includes('skill')) return 'stack';
    if (lowerText.includes('education') || lowerText.includes('study') || lowerText.includes('college')) return 'education';
    if (lowerText.includes('music') || lowerText.includes('song') || lowerText.includes('vibe')) return 'vibe';
    if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('hire')) return 'contact';
    return null;
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    addMessage({ sender: 'You', content: messageText, type: 'text' });
    setIsLoading(true);

    // 1. Detect if User requested a specific card
    const cardTrigger = detectCardTrigger(messageText);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ message: messageText, userId }),
      });

      if (!response.ok) throw new Error('Failed');
      const data = await response.json();

      let aiReply = data?.reply || '';
      let triggerCard = cardTrigger; // Default to user intent

      // 2. Check if Backend explicitly requested a card (Overwrites user intent)
      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        triggerCard = 'contact';
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      addMessage({ sender: 'Aurora', content: aiReply, type: 'mdx' });

      // 3. Show Card if triggered
      if (triggerCard) {
        setTimeout(() => {
          triggerHaptic();
          addMessage({ sender: 'Aurora', type: triggerCard });
        }, 600);
      }

    } catch (error) {
      addMessage({ sender: 'Aurora', content: 'Could you please repeat your request.', type: 'text' });
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = async () => {
    setChatMessages([]);
    localStorage.removeItem('auroraChatMessages');
    try {
      await fetch(API_URL, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ userId }),
      });
    } catch (e) { console.error(e); }
  };

  return { chatMessages, isLoading, addMessage, sendMessage, clearChat };
};