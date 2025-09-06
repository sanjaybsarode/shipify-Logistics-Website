
import React, { useState, useRef, useEffect } from 'react';
import { startChatSession, getShipmentUpdate } from '../services/geminiService';
import ChatIcon from './icons/ChatIcon';
import CloseIcon from './icons/CloseIcon';
import SendIcon from './icons/SendIcon';
import Logo from './icons/Logo';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat session
  useEffect(() => {
    const initChat = async () => {
        try {
            const session = await startChatSession();
            if(session){
                chatSessionRef.current = session;
                setMessages([{ role: 'model', text: 'Hello! I am the Shipify AI Assistant. How can I help you with your logistics questions today?' }]);
            } else {
                setError("Could not start AI chat session. API key may be missing.");
                setMessages([{ role: 'model', text: 'Sorry, the AI Assistant is currently unavailable. Please check the configuration.' }]);
            }
        } catch(e) {
            console.error("Chat initialization failed:", e);
            setError("Failed to initialize AI Assistant.");
        }
    };
    initChat();
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setError(null);
      
    if (!chatSessionRef.current) {
        setError("Chat session is not available. Please ensure the API key is configured correctly in your hosting environment.");
        setIsLoading(false);
        setMessages(prev => [...prev, { role: 'model', text: 'I cannot connect to the AI service right now.' }]);
        return;
    }

    const isShipmentQuery = /shipment|delivery|order|track|SHP-|\bwhere is\b|\bstatus of\b/i.test(currentInput);

    if (isShipmentQuery) {
        // Handle shipment query with a non-streaming, one-off call
        try {
            const responseText = await getShipmentUpdate(currentInput);
            const modelMessage: Message = { role: 'model', text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (err) {
            console.error("Error fetching shipment update:", err);
            setError('Sorry, I encountered an error while fetching shipment data.');
            setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I couldn\'t fetch shipment data right now.' }]);
        } finally {
            setIsLoading(false);
        }
    } else {
        // Handle general conversation with streaming
        
        // Add a placeholder for the streaming model response
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        try {
            const stream = await chatSessionRef.current.sendMessageStream({ message: currentInput });

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text += chunkText;
                    return newMessages;
                });
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setError('Sorry, I encountered an error. Please try again.');
            // Update the last message to show an error
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = 'An error occurred. Please try again.';
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          aria-label="Toggle chat"
        >
          {isOpen ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-2xl">
            <div className="flex items-center gap-2">
                <Logo className="h-7 w-7"/>
                <h3 className="text-lg font-semibold text-gray-800">Shipify AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                <CloseIcon className="h-5 w-5"/>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-800 border'}`}>
                    <p className="text-sm" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br/>')}}></p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length -1]?.role !== 'model' && (
                 <div className="flex justify-start">
                    <div className="max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl bg-white text-gray-800 border">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                    </div>
                </div>
              )}
               <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white rounded-b-2xl">
            {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isLoading ? "Waiting for response..." : "Ask a question..."}
                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading || !!error}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || !chatSessionRef.current}
                className="bg-green-600 text-white rounded-full p-2.5 shadow hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                aria-label="Send message"
              >
                <SendIcon className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
