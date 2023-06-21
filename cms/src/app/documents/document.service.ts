import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) { 
    //this.documents = MOCKDOCUMENTS;
   // this.maxDocumentId = this.getMaxId();
  }
          
  storeDocuments(){
    let documents = JSON.parse(JSON.stringify(this.documents))
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.httpClient
    .put('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/documents.json',
     documents, { headers:headers })
    .subscribe(
      (response:Response) => {
        this.documentListChangedEvent.next(this.documents.slice());
        //this.sortAndSend();
      });
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
  getDocuments(){
    this.httpClient
    .get('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/documents.json')
    .subscribe(
      //success method
      (documents: Document[]) => {
        this.documents = documents;

        this.maxDocumentId = this.getMaxId();
        //sort the list of documents
        this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)

        //emit the next document list change event
        this.documentListChangedEvent.next(this.documents.slice())
        
      },
      //error method
      (error: any) => {
        console.log(error)

      }
    );
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
    if(!newDocument){
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    /*const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);*/
    this.storeDocuments();

   }

   updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument){
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    /*const documentListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentListClone);*/
    this.storeDocuments();

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
  //this.documentListChangedEvent.next(documentListClone);
  this.storeDocuments();
}

}