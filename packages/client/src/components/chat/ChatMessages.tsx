import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export type Message = {
   role: 'user' | 'assistant';
   content: string;
};

type Props = {
   messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onCopyMessage = (e: React.ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div className="flex flex-col gap-3">
         {messages.map((message, index) => (
            <div
               key={index}
               onCopy={onCopyMessage}
               ref={index === messages.length - 1 ? lastMessageRef : null} // For auto-scrolling
               className={`px-3 py-1 max-w-md rounded-xl
                  ${
                     message.role === 'user'
                        ? 'bg-blue-500 text-white self-end rounded-l-3xl rounded-tr-3xl'
                        : 'bg-gray-200 self-start rounded-r-3xl rounded-tl-3xl'
                  }`}
            >
               <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
         ))}
      </div>
   );
};

export default ChatMessages;
