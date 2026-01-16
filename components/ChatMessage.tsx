
import React, { useEffect, useState, useMemo } from 'react';
import { Role } from '../types.ts';
import CodeBlock from './CodeBlock.tsx';

// Make hljs available in the component
declare const hljs: any;

interface ChatMessageProps {
  role: Role;
  text: string;
  onSuggestionClick?: (suggestion: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, text, onSuggestionClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = role === 'user';

  const { mainText, suggestions } = useMemo(() => {
    const suggestionRegex = /\[SUGGESTION: (.*?)\]/g;
    const suggestions: string[] = [];
    const mainText = text.replace(suggestionRegex, (match, suggestionText) => {
      suggestions.push(suggestionText.trim());
      return ''; // Remove the tag from the main text
    }).trim();
    return { mainText, suggestions };
  }, [text]);

  useEffect(() => {
    // Trigger highlight.js when the component mounts or text updates
    if (typeof hljs !== 'undefined') {
      hljs.highlightAll();
    }
  }, [mainText]);

  const handleCopy = () => {
    // A simple way to strip markdown for plain text copy
    const plainText = mainText
      .replace(/```(\w*)\n([\s\S]*?)```/g, '$2') // Extract code from blocks
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
      .replace(/`([^`]+)`/g, '$1'); // Remove inline code backticks

    navigator.clipboard.writeText(plainText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const renderFormattedText = (formattedText: string) => {
    const formatted = formattedText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-700 rounded-sm px-1 py-0.5 text-sm font-mono">$1</code>')
      .replace(/(?:\n|^)\* (.*?)/g, '<br />&bull; $1')
      .replace(/\n/g, '<br />');
    return { __html: formatted };
  };

  const renderContent = () => {
    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    const parts = mainText.split(codeBlockRegex);
    
    if (parts.length <= 1) {
        return <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderFormattedText(mainText)} />;
    }

    return parts.map((part, index) => {
        if (index % 3 === 1) { // language
            return null;
        }
        if (index % 3 === 2) { // code
            const language = parts[index - 1] || 'plaintext';
            return <CodeBlock key={index} language={language} code={part.trim()} />;
        }
        return <div key={index} className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={renderFormattedText(part)} />;
    });
  };
  
  if (isUser) {
    return (
      <div className="flex justify-end items-start mb-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg rounded-br-none shadow-md max-w-2xl">
          <p className="whitespace-pre-wrap">{text}</p>
        </div>
        <div className="w-10 h-10 ml-3 flex-shrink-0 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center font-bold text-slate-600 dark:text-slate-300">
          U
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start items-start mb-4">
      <div className="w-10 h-10 mr-3 flex-shrink-0 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
      </div>
      <div className="group bg-white dark:bg-slate-800 rounded-lg shadow-md max-w-2xl w-full relative">
        <div className="p-4">
          {mainText && renderContent()}
        </div>
        
        {suggestions.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 mt-2 p-4">
              <h4 className="text-sm font-semibold mb-3 text-slate-600 dark:text-slate-400">Mungkin Anda juga tertarik:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSuggestionClick?.(suggestion)}
                    className="px-3 py-1.5 bg-sky-100/50 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm rounded-full hover:bg-sky-100 dark:hover:bg-sky-900 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
          </div>
        )}

        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-md text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          aria-label="Salin jawaban"
        >
          {isCopied ? (
            <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatMessage;
