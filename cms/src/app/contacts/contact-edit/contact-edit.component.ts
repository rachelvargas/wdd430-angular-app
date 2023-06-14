import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';

 
@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit{
  @ViewChild('f') signupForm: NgForm;
  originalContact: Contact;
  contact: Contact;
  id: string;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  //contactForm: FormGroup;
  //contactGroup: any;

  constructor(
    private route:ActivatedRoute,
    private contactService: ContactService,
    private router: Router
    ){}
    ngOnInit(){
      this.route.params.subscribe(
        (params: Params) => {
        //this.id = params['id'];        
        if (!this.id){
          this.editMode = false;
          return;
        }
        //this.contactService.getContact(this.id)
        
        this.originalContact = this.contactService.getContact(this.id);
        if(!this.originalContact){
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
      });
      
      //this.onCancel();
    
    }
    
    onSubmit(form: NgForm) {
      const value = form.value;
      const newContact = new Contact(
        '',
        value.name,
        value.email,
        value.phone,
        value.imageUrl,
        this.groupContacts
        );
        if (this.editMode){
          this.contactService.updateContact(this.originalContact, newContact);
        } else {
          this.contactService.addContact(newContact);
        }
        this.router.navigateByUrl('contacts');
      }

      onCancel(){
        //this.documentService.cancelDocument(this.document);
        this.router.navigateByUrl('/contacts');
      }
      
      isInvalidContact(newContact: Contact){
        if(!newContact){
          return true;
        }
        if (this.contact && newContact.id === this.contact.id){
          return true;
        }
        for (let i = 0; i < this.groupContacts.length; i++) {
          if (newContact.id === this.groupContacts[i].id) {
            return true;
          }
        }
        return false;
      }

      addToGroup($event: any){
        const selectedContact: Contact = $event.dragData;
        const invalidGroupContact = this.isInvalidContact(selectedContact);
        if (invalidGroupContact){
          return;
        }
        this.groupContacts.push(selectedContact)
      }

      onRemoveItem(index: number) {
        if (index < 0 || index >= this.groupContacts.length) {
          return;
        }
        this.groupContacts.splice(index, 1);
      }
    }


