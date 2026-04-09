export interface HealthStatus {
  status: string;
}

export interface OpenaiConversation {
  id: number;
  title: string;
  createdAt: string;
}

export interface OpenaiMessage {
  id: number;
  conversationId: number;
  role: string;
  content: string;
  createdAt: string;
}

export interface CreateOpenaiConversationBody {
  title: string;
}

export interface SendOpenaiMessageBody {
  content: string;
}

export interface OpenaiConversationWithMessages {
  id: number;
  title: string;
  createdAt: string;
  messages: OpenaiMessage[];
}

export interface OpenaiError {
  error: string;
}
