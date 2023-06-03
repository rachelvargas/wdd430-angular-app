import { Component, OnInit, OnDestroy } from '@angular/core';

import { Contact } from '../contact.model';

import { ContactService } from '../contact.service';

import { Subscription } from 'rxjs';
//import { Observable } from 'rxjs';



@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.getContacts();
   }

  ngOnInit(){
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        //this.contactList = contacts;
        this.contacts = contactList;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  }

}
