import {
  Component,
  OnInit,
  ViewChild,
  Output,
  ElementRef,
  EventEmitter,
} from '@angular/core';
//import { FormGroup, NgForm } from '@angular/forms';

import { Message } from '../message.model';

import { MessageService } from '../message.service';

import { ContactService } from '../../contacts/contact.service';

import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  //providers: [ContactService],
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: Contact;
  //currentSender = "101"

  constructor(
    private messageService: MessageService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.contactService.getContact('101').subscribe((response) => {
      this.currentSender = response.contact;
    });
  }

  onSendMessage() {
    const subjectValue = this.subject.nativeElement.value;
    const msgTextValue = this.msgText.nativeElement.value;

    //const newMessage = new Message('1', subjectValue, msgTextValue, this.currentSender);
    const newMessage: Message = new Message(
      '',
      '',
      subjectValue,
      msgTextValue,
      this.currentSender
    );

    this.messageService.addMessage(newMessage);

    //this.addMessageEvent.emit(newMessage);

    this.onClear();
  }

  onClear() {
    this.subject.nativeElement.value = '';
    this.msgText.nativeElement.value = '';
  }
}
