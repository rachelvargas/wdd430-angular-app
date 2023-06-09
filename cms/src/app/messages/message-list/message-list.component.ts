import { Component, OnInit } from '@angular/core';

import { Message } from '../message.model';

import { MessageService } from '../message.service';

import { Subscription, Observable} from 'rxjs'
 

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    //this.messages = this.messageService.getMessages();
    this.messageService.messageListChangedEvent
    .subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
    );
    
    this.messageService.getMessages();

  }

  /*onAddMessage(message: Message){
    //this.messages.push(message);
    this.messageService.messageSelectedEvent.emit(message);
  }*/
}
