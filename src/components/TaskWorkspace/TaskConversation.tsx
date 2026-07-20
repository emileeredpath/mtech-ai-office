import { useState, useEffect, useRef } from 'react';
import * as api from '@/services/api';

interface TaskConversationProps {
  workspace: any;
  taskId: string;
  currentUserId: string;
  onUpdate: () => void;
}

export function TaskConversation({ workspace, taskId, currentUserId, onUpdate }: TaskConversationProps) {
  const [messages, setMessages] = useState<any[]>(workspace.messages || []);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!workspace.conversation?.delegated_to_id) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <p className="text-slate-400 text-lg">No conversation yet</p>
          <p className="text-slate-500 text-sm mt-2">Delegate this task to a specialist to start collaborating</p>
        </div>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setSending(true);

    try {
      // Add user message
      await api.addTaskMessage(taskId, currentUserId, userMessage, 'user');

      // In a real implementation, this would call Claude through the backend
      // For now, we'll just refresh the messages
      const updatedMessages = await api.getTaskMessages(taskId);
      setMessages(updatedMessages);
    } catch (err) {
      console.error('Failed to send message:', err);
      setInput(userMessage); // Restore input on error
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-400">No messages yet</p>
              <p className="text-slate-500 text-sm mt-2">Start a conversation with the specialist below</p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-orange-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-slate-100'
                }`}
              >
                {msg.sender_name && msg.role === 'assistant' && (
                  <p className="text-xs font-medium text-orange-400 mb-1">{msg.sender_name}</p>
                )}
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-6 bg-slate-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Ask ${workspace.conversation.delegated_to_name} for help...`}
            disabled={sending}
            className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <button
            onClick={handleSend}
            disabled={sending || !input.trim()}
            className="px-6 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
        <p className="text-xs text-slate-500 mt-2">You can ask for revisions, feedback, or new versions here.</p>
      </div>
    </div>
  );
}
