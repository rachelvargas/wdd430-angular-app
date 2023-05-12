import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Document } from 'src/app/documents/document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit{
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document('1', ' Bootstrap 3', ' HTML, CSS, and Javascript framework for developing responsive, mobile first websites', 'https://byui.instructure.com/courses/174506', null),
    new Document('2', ' Simply Me', ' Bootstrap theme building', 'https://www.w3schools.com/bootstrap/bootstrap_theme_me.asp', null),
    new Document('3', ' TypeScript', ' Programming language that add syntax to Javascript allowing developers to add types', 'https://www.typescriptlang.org/', null),
    new Document('4', ' Get Started', ' TypeScript for the new programmer', 'https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html', null),
    new Document('5', ' Angular', 'Application-design framework and development platform for creating single-page apps.', 'https://angular.io/guide/what-is-angular', null)
  ];

  constructor(){ }

  ngOnInit(){
 
}
onSelectedDocument(document: Document){
  this.selectedDocumentEvent.emit(document);
}

}
