import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';

import { Message } from '../message.model';

import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  //@Output() addMessageEvent = new EventEmitter<Message>();
  currentSender = "99";

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }
  
  onSendMessage(){
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;
    
    const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender);

    this.messageService.addMessage(newMessage);
    
    //this.addMessageEvent.emit(newMessage);

    this.onClear();  

  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
    
  }

}
