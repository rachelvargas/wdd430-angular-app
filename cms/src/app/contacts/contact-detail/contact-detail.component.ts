import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
//import { WindRefService } from 'src/app/wind-ref.service';



@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;
  //nativeWindow: any;
  //@Input() contact: Contact = new Contact('1', 'R. Kent Jackson', 'jacson@byui.edu', '208-496-3771', '../../assets/images/jacksonk.jpg', null)
  

  constructor(
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      //this.nativeWindow = windRefService.getNativeWindow();
     }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        //this.id = params.['id'];
        this.contact = this.contactService.getContact(this.id);
      }
    );

    //this.nativeWindow = this.windRefService.getNativeWindow();

  }
  onDelete(){
    this.contactService.deleteContact(this.contact);
    this.router.navigateByUrl('/contacts');
  }
}
