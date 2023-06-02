import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
   }

   deleteContact(contact: Contact){
    if(!contact){
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0){
    return;
  }
  this.contacts.splice(pos, 1);
  this.contactChangedEvent.emit(this.contacts.slice());
}
  
   getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
    /*for (let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
    
    return null;*/
     
   }

   getContacts(): Contact[] {
    return this.contacts.slice();
    /*return this.contacts
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();*/
   }

   

}
  

