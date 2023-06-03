import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  //contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  //currentId: number;
  maxContactId: number;
  id: string;

  constructor() {
    this.contacts = MOCKCONTACTS;    
    this.maxContactId = this.getMaxId();
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

   getMaxId(): number{
    let maxld = 0;
    for (let contact of this.contacts){
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxld){
        maxld = currentId;
      }

    }
    return maxld;
   }

   addContact(newContact: Contact){
    /*if(newContact === undefined | null){
      return;
    }*/
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    const contactListClone = this.contacts.slice();

    this.contactListChangedEvent.next(contactListClone);

    
   }

   updateContact(originalContact: Contact, newContact: Contact){
    /*if (originalDocument | newDocument === undefined | null){
      return;
    }*/
    if (!originalContact){
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0){
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);

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
  let contactListClone = this.contacts.slice()
  //this.contactChangedEvent.emit(this.contacts.slice());
  this.contactListChangedEvent.next(contactListClone);
}
   

}
  

