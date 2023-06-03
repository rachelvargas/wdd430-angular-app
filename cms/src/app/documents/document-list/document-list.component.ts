import { Component, OnInit, OnDestroy } from '@angular/core';

import { Document } from 'src/app/documents/document.model';

import { DocumentService } from '../document.service';

import { Subscription } from 'rxjs';
//import { Observable } from 'rxjs';



@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy{
  documents: Document[] = [];
  documentId:string='';
  private subscription: Subscription;


  constructor(private documentService: DocumentService){
    this.documents = this.documentService.getDocuments();
 
   }

  ngOnInit(){
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        //this.documentList = documents;
        this.documents = documentList;
      }
    );
}

ngOnDestroy(): void {
  this.subscription.unsubscribe();

}

}
