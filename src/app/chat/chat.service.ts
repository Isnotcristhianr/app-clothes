import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();

  private messages: Message[] = [];

  constructor() {}

  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    // Simulate fetching messages
    const filteredMessages = this.messages.filter(m => 
      (m.senderId === senderId && m.receiverId === receiverId) ||
      (m.senderId === receiverId && m.receiverId === senderId)
    );
    this.messagesSubject.next(filteredMessages);
    return this.messages$;
  }

  sendMessage(message: Message): Promise<void> {
    message.id = (this.messages.length + 1).toString();
    this.messages.push(message);
    this.messagesSubject.next(this.messages);
    return Promise.resolve();
  }
}