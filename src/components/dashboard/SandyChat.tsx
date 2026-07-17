import { useState, useRef, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  emoji: string;
}

interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  sender_emoji: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
}

interface Conversation {
  id: string;
  messages?: Message[];
}

interface SandyChatProps {
  sandyEmployee: Employee;
  conversation: Conversation | null;
  onSendMessage: (senderId: string, content: string) => Promise<Message>;
}

export function SandyChat({ sandyEmployee, conversation, onSendMessage }: SandyChatProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !conversation) return;

    setLoading(true);
    try {
      await onSendMessage(sandyEmployee.id, input);
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  const messages = conversation?.messages || [];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col h-96">
        {/* Sandy Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
          <span className="text-4xl">{sandyEmployee.emoji}</span>
          <div>
            <h2 className="text-lg font-bold">Sandy</h2>
            <p className="text-blue-200 text-sm">AI Orchestrator</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-lg mb-2">👋 Hello!</p>
              <p>I'm Sandy, your AI orchestrator.</p>
              <p className="text-sm mt-2">Ask me to help organize your team's work.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <span className="text-2xl">{sandyEmployee.emoji}</span>
                  </div>
                )}
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${
                    msg.role === 'assistant'
                      ? 'bg-gray-700 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-700 px-6 py-4 border-t border-gray-600 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tell Sandy what to do..."
            disabled={loading}
            className="flex-1 bg-gray-600 text-white rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded px-4 py-2 text-sm font-semibold transition disabled:opacity-50"
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}
