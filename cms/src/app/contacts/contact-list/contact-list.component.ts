import { Component, OnInit, OnDestroy } from '@angular/core';

import { Contact } from '../contact.model';

import { ContactService } from '../contact.service';

import { Subscription } from 'rxjs';
//import { Observable } from 'rxjs';

import { ContactsFilterPipe } from '../contacts-filter.pipe';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  //contactId: string='';
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) {
    
   }

  ngOnInit(){
    this.subscription = this.contactService.contactListChangedEvent
    .subscribe(
      (contactList: Contact[]) => {
        //this.contactList = contacts;
        this.contacts = contactList;
      }
    );

    this.contactService.getContacts();
  }

  search(value: string){
    this.term = value;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  
  }

}
