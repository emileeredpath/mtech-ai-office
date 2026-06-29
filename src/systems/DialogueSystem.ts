export interface Dialogue {
  id: string;
  speakerId: string;
  text: string;
  duration: number;
  timestamp: number;
}

export interface ConversationContext {
  participants: string[];
  topic: 'task-assignment' | 'greeting' | 'collaboration' | 'meeting' | 'casual';
  sentiment: 'positive' | 'neutral' | 'concerned';
}

export class DialogueSystem {
  private dialogues: Map<string, Dialogue> = new Map();
  private conversationHistory: Map<string, Dialogue[]> = new Map();

  addDialogue(dialogue: Dialogue) {
    this.dialogues.set(dialogue.id, dialogue);

    if (!this.conversationHistory.has(dialogue.speakerId)) {
      this.conversationHistory.set(dialogue.speakerId, []);
    }
    this.conversationHistory.get(dialogue.speakerId)!.push(dialogue);

    // Auto-remove after duration
    setTimeout(() => {
      this.dialogues.delete(dialogue.id);
    }, dialogue.duration * 1000);
  }

  getDialogueForEmployee(employeeId: string): Dialogue | undefined {
    for (const dialogue of this.dialogues.values()) {
      if (dialogue.speakerId === employeeId) {
        return dialogue;
      }
    }
    return undefined;
  }

  getAllActiveDialogues(): Dialogue[] {
    return Array.from(this.dialogues.values());
  }

  generateTaskDialogue(_employeeName: string, taskTitle: string): string {
    const templates = [
      `Got it! Working on "${taskTitle}" now.`,
      `${taskTitle}? On it!`,
      `I'll prioritize "${taskTitle}".`,
      `Let me get started on "${taskTitle}".`,
      `${taskTitle} coming right up!`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateGreetingDialogue(_employeeName: string): string {
    const templates = [
      `Morning! How's it going?`,
      `Hey there! All good?`,
      `Everything alright?`,
      `How can I help?`,
      `Just checking in!`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  generateCollaborationDialogue(_fromEmployee: string, toEmployee: string): string {
    const templates = [
      `Hey ${toEmployee}, need to sync on this?`,
      `${toEmployee}, got a sec to collaborate?`,
      `Can we work through this together?`,
      `Mind if I pick your brain on this?`,
      `Let's brainstorm this one together!`,
    ];
    return templates[Math.floor(Math.random() * templates.length)];
  }

  clear() {
    this.dialogues.clear();
    this.conversationHistory.clear();
  }
}

export const globalDialogueSystem = new DialogueSystem();
