import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


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
 

  constructor(private httpClient: HttpClient) {
    // this.contacts = MOCKCONTACTS;    
    // this.maxContactId = this.getMaxId();
  }

  storeContacts(){
    let contacts = JSON.parse(JSON.stringify(this.contacts))
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.httpClient
    .put('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/contacts.json',
     contacts, { headers:headers })
    .subscribe(
      (response:Response) => {
        this.contactListChangedEvent.next(this.contacts.slice());
        //this.sortAndSend();
      });
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

   getContacts() {
    this.httpClient
      .get('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;

          this.maxContactId = this.getMaxId();
          
          this.contacts.sort((a,b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        // error handler
        (error: any) => {
          console.log(error);
        }
      );

    // return this.contacts.slice();
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
    if(!newContact){
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    /*const contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);*/    
    this.storeContacts();
    
   }

   updateContact(originalContact: Contact, newContact: Contact){
    if (!originalContact || !newContact){
      return;
    }
    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0){
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    /*let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);*/
    this.storeContacts();
    }
    deleteContact(contact: Contact){
      if(!contact) {
        return;
      }
      const pos = this.contacts.indexOf(contact);
      if (pos < 0){
        return;
      }
      this.contacts.splice(pos, 1);
      let contactListClone = this.contacts.slice()
      //this.contactChangedEvent.emit(this.contacts.slice());
      //this.contactListChangedEvent.next(contactListClone);
      return this.storeContacts();
    }
  }