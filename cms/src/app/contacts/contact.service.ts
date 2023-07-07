import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = [];
  maxContactId: number;
  id: string;
 

  constructor(private httpClient: HttpClient) {
   
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

   getContact(id: string) {
    return this.httpClient.get<{ message: string, contact: Contact }>('http://localhost:3000/contacts/' + id);
    //return this.contacts.find((contact) => contact.id === id);
    /*for (let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }    
    return null;*/
     
   }

   getContacts() {
    this.httpClient
      .get<{ message : string, contacts: Contact[] }>('http://localhost:3000/contacts/')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.sortAndSend();
        },
        // error handler
        (error: any) => {
          console.log(error);
        }
      );
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

   sortAndSend(){
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactListChangedEvent.next(this.contacts.slice());
   }

   addContact(contact: Contact){
    if(!contact){
      return;
    }
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.httpClient
    .post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    contact, { headers: headers })
    .subscribe(
      (responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      }
    );
     
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
    newContact.id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers})
    .subscribe(
      (response: Response) => {
        this.contacts[pos] = newContact;
        this.sortAndSend();
      }
    );
    }
    deleteContact(contact: Contact){
      if(!contact) {
        return;
      }
      const pos = this.contacts.findIndex(c => c.id === contact.id);
      if (pos < 0){
        return;
      }
      
      this.httpClient.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}