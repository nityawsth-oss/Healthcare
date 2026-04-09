
export interface OpenaiMessage {
  id: number;
  conversationId: number;
  role: string;
  content: string;
  createdAt: Date;
}
