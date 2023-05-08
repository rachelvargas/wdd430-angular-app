import { Component, EventEmitter, Output } from '@angular/core';
//import { Contact } from './contact.model';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();
  //selectedContact: Contact;

  onSelected(selectedEvent:string){
    this.selectedFeatureEvent.emit(selectedEvent);
  }


}