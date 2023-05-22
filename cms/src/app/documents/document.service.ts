import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({ 
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documents: Document[] = [];

  constructor() { 
    this.documents = MOCKDOCUMENTS;
  } 
  
  getDocument(id:string) {
    //return this.documents.find((document) => document.id === id);
    for (let document of this.documents){
      if(document.id == id){
        return document
      }
    }
    
    return null
  }
  getDocuments(): Document[] {
    return this.documents.slice();
    /*return this.documents
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();*/
   }
  

  }

 

