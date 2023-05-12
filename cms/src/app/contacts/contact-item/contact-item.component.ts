import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Contact } from 'src/app/contacts/contact.model'; //src/app/contacts/contact.model
 
@Component({
  selector: 'cms-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent implements OnInit {
  @Input() contact: Contact;
  //@Output() contactSelected = new EventEmitter<void>();
  //@Input() contact: Contact = new Contact('1', 'R. Kent Jackson', 'jacson@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', null)
   

  constructor() { }

  ngOnInit() {
  }

}
