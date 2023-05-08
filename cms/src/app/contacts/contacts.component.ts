import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit{
  //@Output() selectedFeatureEvent = new EventEmitter<string>();
  selectedContact: Contact;

  constructor() { }

  ngOnInit() {
  }

  /*onSelected(feature:string){
    this.selectedFeatureEvent.emit(feature);
  }*/


}
