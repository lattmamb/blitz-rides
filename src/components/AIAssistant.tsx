
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hi there! I'm your AI assistant. How can I help you with your vehicle rental experience today?", isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    const userQuery = inputValue;
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      let response;
      
      if (userQuery.toLowerCase().includes('price') || userQuery.toLowerCase().includes('cost')) {
        response = "Our subscription plans start at $149/month for the Model 3, with flexible terms and all-inclusive pricing. Would you like to see detailed pricing for specific models?";
      } else if (userQuery.toLowerCase().includes('tesla') || userQuery.toLowerCase().includes('model')) {
        response = "We offer the full Tesla lineup including Model S, Model 3, Model X, Model Y, and Cybertruck. Each vehicle comes with Autopilot as standard. Would you like to learn more about a specific model?";
      } else if (userQuery.toLowerCase().includes('book') || userQuery.toLowerCase().includes('reserve')) {
        response = "Booking is easy! You can reserve your vehicle through our app or website. Simply select your preferred model, subscription plan, and pickup location. Would you like me to guide you through the process?";
      } else if (userQuery.toLowerCase().includes('charging') || userQuery.toLowerCase().includes('station')) {
        response = "All subscriptions include unlimited access to our Supercharger network. We have over 50 charging stations across the city, and the app will show you real-time availability and directions to the nearest station.";
      } else {
        response = "I'd be happy to help with that. You can browse our vehicle selection, view subscription options, or get assistance with booking. What specific information are you looking for?";
      }
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)} 
          className="fixed bottom-6 right-6 z-40 bg-tesla-blue text-white p-4 rounded-full shadow-lg blue-glow hover:bg-tesla-purple transition-colors duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] glass-card z-40 flex flex-col overflow-hidden blue-glow">
          {/* Header */}
          <div className="p-4 border-b border-glass-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-tesla-green animate-pulse"></div>
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white/70 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser 
                      ? 'bg-tesla-blue text-white rounded-br-none' 
                      : 'bg-glass text-white rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-3 border-t border-glass-border">
            <div className="flex gap-2">
              <textarea 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-glass rounded-lg p-2 resize-none focus:outline-none focus:ring-1 focus:ring-tesla-blue text-white placeholder-white/50"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-tesla-blue hover:bg-tesla-blue/90 text-white h-full aspect-square p-2"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-white/50">Powered by AI - For demonstration purposes</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
