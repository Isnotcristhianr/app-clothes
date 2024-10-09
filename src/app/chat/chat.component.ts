import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService, Message } from './chat.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'ns-chat',
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  currentUserId: string;
  receiverId: string;
  receiverName: string = 'User';

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser().uid;
    this.receiverId = this.route.snapshot.params.id;

    this.chatService.getMessages(this.currentUserId, this.receiverId)
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  onSendMessage(): void {
    if (this.newMessage.trim()) {
      const message: Message = {
        id: '',
        senderId: this.currentUserId,
        receiverId: this.receiverId,
        text: this.newMessage.trim(),
        timestamp: new Date().getTime()
      };

      this.chatService.sendMessage(message)
        .then(() => {
          this.newMessage = '';
        })
        .catch(error => console.error('Error sending message:', error));
    }
  }
}