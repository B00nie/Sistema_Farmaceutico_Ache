import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minimize2, Bot } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou o assistente do sistema de análise farmacêutica. Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simula resposta do bot
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (userText: string): string => {
    const text = userText.toLowerCase();

    if (text.includes('análise') || text.includes('analise')) {
      return 'Para realizar uma análise, acesse a página "Análise de Embalagens"...';
    }

    if (text.includes('erro') || text.includes('problema')) {
      return 'Se você está encontrando problemas, verifique: 1) Conexão, 2) Formato da imagem, 3) Qualidade.';
    }

    if (text.includes('inventário') || text.includes('estoque')) {
      return 'No inventário você pode visualizar todos os itens analisados e exportar relatórios.';
    }

    if (text.includes('yolo') || text.includes('caixa') || text.includes('cartela')) {
      return 'O YOLOv8 é especializado em detectar caixas farmacêuticas e cartelas de comprimidos.';
    }

    if (text.includes('opencv') || text.includes('frasco') || text.includes('blister')) {
      return 'O OpenCV é especializado em frascos (tampas, rótulos) e blisters (alvéolos).';
    }

    if (text.includes('configurar') || text.includes('configuração')) {
      return 'As configurações estão disponíveis na página de Administração.';
    }

    if (text.includes('diferença') || text.includes('quando usar')) {
      return 'YOLOv8: caixas/cartelas. OpenCV: frascos/blisters.';
    }

    if (text.includes('tampa') || text.includes('frasco')) {
      return 'Para análise de frascos e tampas, use a aba OpenCV.';
    }

    if (text.includes('cartela') || text.includes('comprimido')) {
      return 'Para análise de cartelas de comprimidos, use a aba YOLOv8.';
    }

    if (text.includes('ajuda') || text.includes('como')) {
      return 'Posso ajudar com análises (YOLOv8 ou OpenCV), inventário, configurações ou suporte.';
    }

    if (text.includes('obrigado') || text.includes('valeu')) {
      return 'Fico feliz em ajudar! Se tiver mais dúvidas, estarei aqui.';
    }

    return 'Entendi sua pergunta. Para mais detalhes, consulte a documentação ou o suporte.';
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-full shadow-lg hover:from-pink-700 hover:to-pink-800 transition-all transform hover:scale-110 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-12' : 'w-80 h-96'
    }`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 h-full flex flex-col transition-colors">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-pink-600 to-pink-700 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-white">Assistente Farmacêutico</h3>
              <p className="text-xs text-pink-100">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-pink-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="w-4 h-4 mt-0.5 text-pink-600 flex-shrink-0" />
                      )}
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === 'user'
                          ? 'text-pink-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 max-w-xs rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-pink-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;