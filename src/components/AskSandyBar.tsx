import { Send, Brain } from 'lucide-react';

interface AskSandyBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export function AskSandyBar({ value, onChange, onSubmit, isProcessing }: AskSandyBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div
      className="px-6 py-3 flex-shrink-0 border-b flex items-center gap-3"
      style={{ backgroundColor: '#0B0F16', borderColor: '#1E2733' }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #F9701F, #FFB067)' }}
      >
        <Brain size={18} color="#0A0E14" />
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask Sandy to run a workflow… e.g. “Update website prices and announce it on social”"
        disabled={isProcessing}
        className="flex-1 h-10 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 transition-all"
        style={{
          backgroundColor: '#141C28',
          color: '#E8ECF1',
          border: '1px solid #263243',
        }}
      />

      <button
        onClick={onSubmit}
        disabled={isProcessing || !value.trim()}
        className="h-10 px-5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all flex-shrink-0"
        style={{
          backgroundColor: value.trim() && !isProcessing ? '#F9701F' : 'rgba(249, 112, 31, 0.35)',
          color: '#0A0E14',
          cursor: value.trim() && !isProcessing ? 'pointer' : 'not-allowed',
        }}
      >
        {isProcessing ? (
          <div className="w-4 h-4 border-2 border-[#0A0E14] border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <Send size={14} />
            Ask Sandy
          </>
        )}
      </button>
    </div>
  );
}
