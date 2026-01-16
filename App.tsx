
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage as ChatMessageType } from './types.ts';
import { getEducationalAnswerStream } from './services/geminiService.ts';
import Header from './components/Header.tsx';
import ChatInput from './components/ChatInput.tsx';
import ChatMessage from './components/ChatMessage.tsx';
import LoadingSpinner from './components/LoadingSpinner.tsx';
import WelcomeScreen from './components/WelcomeScreen.tsx';
import LandingPage from './components/LandingPage.tsx';
import { GenerateContentResponse } from '@google/genai';

const App: React.FC = () => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    const userMessage: ChatMessageType = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = await getEducationalAnswerStream(prompt, chatRef);
      
      let modelMessage: ChatMessageType = { role: 'model', text: '' };
      setMessages(prev => [...prev, modelMessage]);

      for await (const chunk of stream) {
        const chunkText = (chunk as GenerateContentResponse).text;
        if(chunkText) {
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text += chunkText;
            return newMessages;
          });
        }
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi galat yang tidak diketahui.';
      const errorText = `Maaf, saya tidak dapat memproses permintaan Anda saat ini. Silakan coba lagi nanti. (${errorMessage})`;
      setError(errorText);
      const errorResponseMessage: ChatMessageType = { role: 'model', text: errorText };
      setMessages(prev => [...prev, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleStartChat = () => {
    setShowChat(true);
  };

  if (!showChat) {
    return <LandingPage onStartChat={handleStartChat} />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 && !isLoading && <WelcomeScreen onPromptClick={handleSendMessage} />}
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              role={msg.role}
              text={msg.text}
              onSuggestionClick={handleSendMessage}
            />
          ))}
          {isLoading && messages[messages.length -1]?.role !== 'model' && (
            <div className="flex justify-start items-center space-x-3">
              <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              </div>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg rounded-bl-none shadow-md">
                <LoadingSpinner />
              </div>
            </div>
          )}
          {error && messages[messages.length-1]?.text.includes("Maaf, saya tidak dapat memproses") === false && 
            <div className="text-red-500 text-center p-4 bg-red-500/10 rounded-lg">{error}</div>}
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;
