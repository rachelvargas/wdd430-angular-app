import { Component, Input, OnInit } from '@angular/core';

import { MessageModel } from '../message.model'

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: MessageModel;

  constructor(){ }

  ngOnInit(){
    
  }

}
