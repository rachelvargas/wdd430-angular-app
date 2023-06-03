import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

import { Subject } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class DocumentService {
  //documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  //currentId: number;
  maxDocumentId: number;
  id:string;

  constructor() { 
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }
  
  getDocument(id:string): Document {
    return this.documents.find((document) => document.id === id);
    //return this.documents[id];
    /*for (let document of this.documents){
      if(document.id == id){
        return document
      }
    }
    
    return null*/
  }
  getDocuments(): Document[] {
    return this.documents.slice();
    /*return this.documents
    .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
    .slice();*/
   }

   getMaxId(): number {
    let maxld = 0
    for (let document of this.documents){
      const currentId = parseInt(document.id, 10);  
      if (currentId > maxld){
        maxld = currentId;
      }

    }
    return maxld;
   }

   addDocument(newDocument: Document){
    /*if(newDocument === undefined | null){
      return;
    }*/
    if(!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    const documentListClone = this.documents.slice();

    this.documentListChangedEvent.next(documentListClone);

   }

   updateDocument(originalDocument: Document, newDocument: Document){
    /*if (originalDocument | newDocument === undefined | null){
      return;
    }*/
    if (!originalDocument){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);

  }   
  deleteDocument(document: Document){
    if(!document){
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0){
    return;
  }
  this.documents.splice(pos, 1);
  var documentListClone = this.documents.slice();
  //this.documentListChangedEvent.emit(this.documents.slice());
  this.documentListChangedEvent.next(documentListClone);
}

}