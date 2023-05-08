import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { MessageModel } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit{
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<MessageModel>();
  currentSender = "Rachel Vargas";

  constructor() { }

  ngOnInit() {
  }
  onSendMessage(){
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    const message = new MessageModel('1', subjectValue, msgTextValue, this.currentSender);

    this.addMessageEvent.emit(message);

    this.onClear()  

  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
    
  }

}
