import { useState, useEffect } from 'react';
import { triggerHaptic } from '../utils/triggerHaptic';

// FIX: Use Environment Variables for API Configuration
// Define VITE_CHAT_API_URL and VITE_CHAT_API_KEY in your .env file
const API_URL = import.meta.env.VITE_CHAT_API_URL || 'https://ai-backend-2.vercel.app/api/chat';
const API_KEY = import.meta.env.VITE_CHAT_API_KEY || 'AI-Laksh123'; // Fallback for development

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

  // --- 1. KEYWORD DETECTION ENGINE ---
  const detectCardTrigger = (text) => {
    const lowerText = text.toLowerCase();
    
    // Project Triggers
    if (['project', 'work', 'build', 'built', 'github', 'repo', 'portfolio'].some(k => lowerText.includes(k))) return 'project';
    
    // Experience Triggers
    if (['experience', 'job', 'work', 'intern', 'company', 'career', 'role'].some(k => lowerText.includes(k))) return 'experience';
    
    // Tech Stack Triggers
    if (['stack', 'tech', 'skill', 'tool', 'language', 'framework', 'react', 'node'].some(k => lowerText.includes(k))) return 'stack';
    
    // Vibe/Spotify Triggers
    if (['music', 'song', 'vibe', 'listening', 'spotify', 'playing', 'sound', 'track', 'playlist', 'hear'].some(k => lowerText.includes(k))) return 'vibe';
    
    // Contact Triggers
    if (['contact', 'email', 'mail', 'hire', 'call', 'meet', 'reach'].some(k => lowerText.includes(k))) return 'contact';
    
    return null;
  };

  // --- 2. CUSTOM OVERRIDE RESPONSES ---
  const replyOverrides = {
    project: "I've pulled up Laksh's latest GitHub shipments for you. Swipe to explore!",
    experience: "Here is a timeline of Laksh's professional journey and internships.",
    stack: "These are the weapons in Laksh's technical arsenal:",
    vibe: "Connecting to Spotify... Here's what keeps Laksh in the zone right now! 🎧",
    contact: "I'd love to help you get in touch. Here is his contact card."
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim() || isLoading) return;

    // 1. Add User Message
    addMessage({ sender: 'You', content: messageText, type: 'text' });
    setIsLoading(true);

    // 2. Determine Intent locally
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
      let triggerCard = cardTrigger;

      // 3. Priority Check: If Backend explicitly requests a card (e.g., [SHOW_CONTACT_CARD])
      if (aiReply.includes('[SHOW_CONTACT_CARD]')) {
        triggerCard = 'contact';
        aiReply = aiReply.replace('[SHOW_CONTACT_CARD]', '');
      }

      // 4. OVERRIDE TEXT: If we triggered a card locally, ignore the backend's generic text
      if (triggerCard && replyOverrides[triggerCard]) {
        aiReply = replyOverrides[triggerCard];
      }

      // 5. Add Final Response
      addMessage({ sender: 'Aurora', content: aiReply, type: 'mdx' });

      // 6. Show Card (with delay for effect)
      if (triggerCard) {
        setTimeout(() => {
          triggerHaptic();
          addMessage({ sender: 'Aurora', type: triggerCard });
        }, 600);
      }

    } catch (error) {
      console.error(error);
      addMessage({ sender: 'Aurora', content: 'My connection seems a bit unstable. Could you repeat that?', type: 'text' });
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