
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '../types';
import { getResponse, createUserMessage } from '../services/chatService';

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initial greeting
  useEffect(() => {
    const initialMessage = getResponse('hola');
    setMessages([initialMessage]);
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create new user message
    const userMessage = createUserMessage(input);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate delay for bot response
    setTimeout(() => {
      const botResponse = getResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="container py-8 px-4 md:py-12 md:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                  J
                </div>
              </div>
              <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Jamito</h1>
          <p className="text-muted-foreground">
            Tu asistente para encontrar el lugar perfecto
          </p>
        </div>
        
        <div className="bg-card rounded-xl shadow-sm border overflow-hidden flex flex-col h-[500px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-100"></div>
                      <div className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Input Form */}
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-muted rounded-lg p-4">
          <h2 className="font-semibold mb-2">Sugerencias de conversación</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => {
                setInput("Busco un lugar tranquilo para trabajar");
              }}
            >
              Busco un lugar tranquilo para trabajar
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => {
                setInput("Recomiéndame un restaurante romántico");
              }}
            >
              Recomiéndame un restaurante romántico
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => {
                setInput("¿Dónde puedo ir con niños?");
              }}
            >
              ¿Dónde puedo ir con niños?
            </Button>
            <Button 
              variant="outline" 
              className="justify-start"
              onClick={() => {
                setInput("Quiero un café con buen ambiente");
              }}
            >
              Quiero un café con buen ambiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
