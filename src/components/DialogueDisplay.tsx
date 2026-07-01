import { useEffect, useState } from 'react';
import { globalDialogueSystem, Dialogue } from '@/systems/DialogueSystem';

interface DialogueDisplayProps {
  maxDisplay?: number;
}

export function DialogueDisplay({ maxDisplay = 3 }: DialogueDisplayProps) {
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const active = globalDialogueSystem.getAllActiveDialogues();
      setDialogues(active.slice(0, maxDisplay));
    }, 100);

    return () => clearInterval(interval);
  }, [maxDisplay]);

  if (dialogues.length === 0) return null;

  const getCharacterName = (speakerId: string): string => {
    const names: Record<string, string> = {
      sandy: 'Sandy',
      'proposal-writer': 'Proposal Writer',
      'marketing-director': 'Marketing Director',
      'website-auditor': 'Website Auditor',
      'seo-manager': 'SEO Manager',
      'social-media-manager': 'Social Media Manager',
      'email-manager': 'Email Manager',
      'case-study-writer': 'Case Study Writer',
      'funding-manager': 'Funding Manager',
    };
    return names[speakerId] || speakerId;
  };

  return (
    <div className="fixed top-6 right-6 max-w-md space-y-2 z-20 pointer-events-none">
      {dialogues.map((dialogue) => (
        <div
          key={dialogue.id}
          className="animate-fade-in-up"
          style={{
            animation: `fadeInUp 0.3s ease-out`,
          }}
        >
          <div className="bg-[#1D2A3A] border border-[#3a4f6a] rounded-lg p-3 shadow-xl">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#F9701F] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {getCharacterName(dialogue.speakerId).charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#F9701F]">
                  {getCharacterName(dialogue.speakerId)}
                </p>
                <p className="text-sm text-[#F0F4F8] mt-1 break-words">{dialogue.text}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
