import { Component, OnInit } from '@angular/core';

import { MessageModel } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent {
  messages: MessageModel[] = [
    new MessageModel('1', 'Subject 1', 'Message Text 1', 'Brother Thayne'),
    new MessageModel('2', 'Subject 2', 'Message Text 2', 'Brother Tahyne'),
    new MessageModel('3', 'Subject 3', 'Message Text 3', 'Brother Thayne')
  ];

  constructor() { }

  ngOnInit() {

  }

  onAddMessage(message: MessageModel){
    this.messages.push(message);
  }
}
