'use client';

import { Fragment, useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Calendar, Clock, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  showContactCta?: boolean;
}

const shouldShowContactCta = (userMessage: string) => {
  const message = userMessage.toLowerCase();
  return [
    'price',
    'pricing',
    'cost',
    'quote',
    'budget',
    'contact',
    'email',
    'phone',
    'call',
    'appointment',
    'book',
    'booking',
    'demo',
    'meeting',
    'consultation',
  ].some((keyword) => message.includes(keyword));
};

const renderFormattedText = (text: string) =>
  text.split('\n').map((line, lineIndex) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);

    return (
      <Fragment key={`line-${lineIndex}`}>
        {parts.map((part, partIndex) => {
          const isBold = part.startsWith('**') && part.endsWith('**') && part.length > 4;
          const content = isBold ? part.slice(2, -2) : part;

          return isBold ? (
            <strong key={`part-${partIndex}`} className="font-semibold text-[#0C4B2A]">
              {content}
            </strong>
          ) : (
            <Fragment key={`part-${partIndex}`}>{content}</Fragment>
          );
        })}
        {lineIndex < text.split('\n').length - 1 && <br />}
      </Fragment>
    );
  });

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
};

const Chatbot = () => {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm ASG Solutions Assistant.\n\nI can help you with appointments, our services, pricing, and more. What can I do for you today?",
      sender: 'bot',
      timestamp: 0,
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHasHydrated(true);
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.timestamp === 0 ? { ...message, timestamp: Date.now() } : message
      )
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Disable background scroll while the mobile chat sheet owns the viewport.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen && window.matchMedia('(max-width: 767px)').matches) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const quickActions = [
    { label: 'Book Appointment', icon: Calendar },
    { label: 'Reschedule Meeting', icon: Clock },
    { label: 'Our Services', icon: MessageCircle },
  ];

  const getAIResponse = async (userMessage: string): Promise<string> => {
    const sessionId = window.localStorage.getItem('asg_chatbot_session_id') || crypto.randomUUID();
    window.localStorage.setItem('asg_chatbot_session_id', sessionId);

    const response = await fetch('/api/v1/chatbot/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, message: userMessage }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(payload?.message || 'Chatbot backend request failed');
    }

    return payload?.data?.answer || "I'm having trouble answering right now. Please contact us at ASG.solutions@outlook.com or +91 8878858338.";
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    const userText = inputValue;
    const userMessage: Message = {
      id: messages.length + 1,
      text: userText,
      sender: 'user',
      timestamp: Date.now(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await getAIResponse(userText);
      const showContactCta = shouldShowContactCta(userText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: responseText,
        sender: 'bot',
        timestamp: Date.now(),
        showContactCta,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Sorry, something went wrong! Please reach us at ASG.solutions@outlook.com or +91 8878858338.",
        sender: 'bot',
        timestamp: Date.now(),
        showContactCta: shouldShowContactCta(userText),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Subtle Blur Overlay */}
      <div
        className={`fixed inset-0 z-80 bg-black/5 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Toggle Button - Disappears when chat is open */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`hover:cursor-pointer fixed bottom-6 right-6 z-100 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl bg-[#0C4B2A] hover:scale-105 active:scale-95 ${
          isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'
        }`}
        aria-label="Open Chat"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed inset-0 z-90 flex items-end justify-center md:items-end md:justify-end md:p-6 transition-all duration-500 pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className={`h-[100dvh] w-full bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-500 pointer-events-auto md:h-[650px] md:max-h-[85vh] md:w-[420px] md:rounded-3xl ${
            isOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0C4B2A] p-5 flex items-center gap-4 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg tracking-tight">ASG Assistant</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">Active Now</span>
              </div>
            </div>
            {/* Close Button on Top Right of Header */}
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-white hover:bg-white/10 transition-all absolute top-3 right-3"
              aria-label="Close Chat"
            >
              <X className="w-7 h-7 hover:cursor-pointer" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 bg-[#f8faf9] flex flex-col gap-6 no-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-[#0C4B2A] rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-[#0C4B2A]/10">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed relative ${
                    message.sender === 'user'
                      ? 'bg-[#0C4B2A] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {message.sender === 'bot' ? renderFormattedText(message.text) : message.text}
                  </div>
                  {message.sender === 'bot' && message.showContactCta && (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/contact');
                      }}
                      className="mt-4 inline-flex items-center rounded-xl bg-[#0C4B2A] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[#0a3d22]"
                    >
                      Go To Contact Page
                    </button>
                  )}
                  <p
                    className={`text-[10px] mt-2 font-medium ${
                      message.sender === 'user' ? 'text-white/50 text-right' : 'text-gray-400'
                    }`}
                  >
                    {hasHydrated && message.timestamp ? formatTime(message.timestamp) : ''}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-3">
                <div className="w-8 h-8 bg-[#0C4B2A] rounded-xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-[#0C4B2A]/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-[#0C4B2A]/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-[#0C4B2A] rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="px-5 py-4 bg-white border-t border-gray-50 flex gap-2.5 overflow-x-auto no-scrollbar shrink-0">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => setInputValue(action.label)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-100 bg-gray-50 text-[#0C4B2A] text-sm font-semibold whitespace-nowrap hover:bg-[#0C4B2A] hover:text-white hover:border-[#0C4B2A] transition-all duration-200"
              >
                <action.icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-5 bg-white border-t border-gray-50">
            <div className="flex gap-3 items-center bg-gray-50 rounded-2xl p-1.5 pr-2 focus-within:ring-2 focus-within:ring-[#0C4B2A]/10 transition-all border border-transparent focus-within:border-[#0C4B2A]/20">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Message ASG Assistant..."
                className="flex-1 bg-transparent px-4 py-3 text-[15px] outline-none placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                  !inputValue.trim() || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#0C4B2A] text-white hover:scale-105 active:scale-95 shadow-lg shadow-[#0C4B2A]/20'
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
