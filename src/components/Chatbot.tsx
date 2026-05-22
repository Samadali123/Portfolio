
import { Fragment, useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Calendar, Clock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  showContactCta?: boolean;
}

const SYSTEM_PROMPT = `You are Nexora Assistant, the helpful AI chatbot for Nexora Solution — a cutting-edge tech Startup.

Your personality: Professional yet friendly, concise, helpful, and clear.

Company info:
- Services: Cloud Solutions , AI & Automation, Data Analytics, Software Development
- Pricing: For pricing, encourage users to contact us for a tailored quote and share our contact details
- Contact: Nexora.solution@outlook.com | +91 8878858338 | Bhopal, Madhya Pradesh, 462001
- Hours: Mon–Fri 9AM–6PM IST, Sat 10AM–4PM IST, Sun closed
- Free consultation available — book via the Contact page

Guidelines:
- Keep responses concise for simple queries, but structured and more detailed for project, architecture, pricing, or technical questions
- Never output raw asterisks as plain formatting noise. If you need emphasis, wrap only key words or main highlighting words in bold font dont make use of astrisks * anywher
- Use clean structure:
  1. Start with a direct answer
  2. Then add 2-4 short points or short paragraphs
  3. End with a helpful next step when relevant
- When users ask about projects, architecture, software development, cloud, AI, or technical decisions, answer like a Senior Solutions Architect in the easiest way possible:
  - explain clearly in simple language
  - reduce jargon
  - focus on practical steps, tradeoffs, timelines, and outcomes
- When users ask about pricing, quote, budget, or cost:
  - share that pricing depends on scope
  - include our email: Nexora.solution@outlook.com
  - include our phone: +91 8878858338
  - encourage them to use the website contact page for a tailored quote
- For appointments/bookings, direct to the Contact page or phone
- Always end with a helpful follow-up when relevant`;


const ENV = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const GEMINI_API_KEY = ENV.VITE_GEMINI_API_KEY;
const PRIMARY_MODEL = ENV.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
const FALLBACK_MODELS = (ENV.VITE_GEMINI_FALLBACK_MODELS || 'gemini-2.0-flash-lite')
  .split(',')
  .map((model) => model.trim())
  .filter(Boolean);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const modelEndpoint = (model: string) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

const parseGeminiError = async (response: Response): Promise<string> => {
  const errorData = await response.json().catch(() => null);
  return errorData?.error?.message || `Request failed with status ${response.status}`;
};

const shouldShowContactCta = (userMessage: string, botMessage: string) => {
  const combined = `${userMessage} ${botMessage}`.toLowerCase();
  return ['price', 'pricing', 'cost', 'quote', 'budget', 'contact', 'appointment', 'book']
    .some((keyword) => combined.includes(keyword));
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

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Nexora Assistant 👋\n\nI can help you with appointments, our services, pricing, and more. What can I do for you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Disable body scroll when chat is open on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const quickActions = [
    { label: 'Book Appointment', icon: Calendar },
    { label: 'Reschedule Meeting', icon: Clock },
    { label: 'Our Services', icon: MessageCircle },
  ];

  const buildGeminiHistory = (history: Message[]) =>
    history.slice(-10).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

  const callGeminiWithRetry = async (
    model: string,
    body: unknown,
    retries = 1,
  ): Promise<{ response: Response; errorMessage: string | null }> => {
    let attempt = 0;
    while (attempt <= retries) {
      const response = await fetch(modelEndpoint(model), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return { response, errorMessage: null };
      }

      if (response.status === 429 && attempt < retries) {
        // Basic backoff for rate-limit bursts.
        await delay(700 * (attempt + 1));
        attempt += 1;
        continue;
      }

      return {
        response,
        errorMessage: await parseGeminiError(response),
      };
    }

    throw new Error('Unexpected retry flow');
  };

  const getAIResponse = async (userMessage: string, history: Message[]): Promise<string> => {
    if (!GEMINI_API_KEY) {
      return 'The AI assistant is not configured yet. Please add VITE_GEMINI_API_KEY in your .env file and restart the dev server.';
    }

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [...buildGeminiHistory(history), { role: 'user', parts: [{ text: userMessage }] }],
      generationConfig: { maxOutputTokens: 500, temperature: 0.7, topP: 0.9 },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      ],
    };

    const candidateModels = Array.from(new Set([PRIMARY_MODEL, ...FALLBACK_MODELS]));
    let lastStatus = 0;
    let lastErrorMessage = '';

    for (const model of candidateModels) {
      const { response, errorMessage } = await callGeminiWithRetry(model, body, 1);
      lastStatus = response.status;
      lastErrorMessage = errorMessage || '';

      if (!response.ok) {
        // Skip only unavailable model ids. Quota/auth errors won't be fixed by trying more models.
        if (response.status === 404) {
          console.warn(`Gemini model "${model}" is unavailable: ${lastErrorMessage}`);
          continue;
        }

        console.error(`Gemini API error for model "${model}":`, lastErrorMessage);
        break;
      }

      const data = await response.json();
      const text =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text || '')
          .join('') || '';

      if (text.trim()) return text.trim();
    }

    if (lastStatus === 429) {
      return "I'm currently rate-limited by the AI provider. Please wait about a minute and try again, or contact us at Nexora.solution@outlook.com / +91 8878858338 for immediate help.";
    }

    if (lastStatus === 403) {
      return 'The AI assistant API key is being rejected. Check your Gemini API key, API restrictions, and allowed referrers in the Google Cloud / AI Studio console.';
    }

    if (lastStatus === 404) {
      return `The configured Gemini model "${PRIMARY_MODEL}" was not found. Update VITE_GEMINI_MODEL in your .env file to a currently available model and restart the dev server.`;
    }

    return "I'm having trouble connecting to AI right now. Please contact us at Nexora.solution@outlook.com or +91 8878858338 and we'll help you directly.";
  };

  const handleSend = async () => {
    if (inputValue.trim() === '' || isTyping) return;

    const userText = inputValue;
    const userMessage: Message = {
      id: messages.length + 1,
      text: userText,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const responseText = await getAIResponse(userText, updatedMessages);
      const showContactCta = shouldShowContactCta(userText, responseText);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
        showContactCta,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: "Sorry, something went wrong! Please reach us at Nexora.solution@outlook.com or +91 8878858338. 📞",
        sender: 'bot',
        timestamp: new Date(),
        showContactCta: true,
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
          className={`w-full md:w-[420px] h-100dvh md:h-[650px] md:max-h-[85vh] bg-white md:rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-500 pointer-events-auto ${
            isOpen ? 'translate-y-0 scale-100' : 'translate-y-12 scale-95'
          }`}
        >
          {/* Header */}
          <div className="bg-[#0C4B2A] p-5 flex items-center gap-4 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full" />
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg tracking-tight">Nexora Assistant</h3>
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
                        navigate('/contact');
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
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                placeholder="Message Nexora Assistant..."
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
