import { Injectable } from '@angular/core';
import { Document } from './document.model';

import { Subject, Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documents: Document[] = [];
  maxDocumentId: number;
  id:string;

  constructor(private httpClient: HttpClient) { 
    
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
    .get<{message: string, documents: Document[]}>('http://localhost:3000/documents')
    .subscribe(
      //success method
      (documentData) => {
        this.documents = documentData.documents;

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

   sortAndSend(){
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
   }
   addDocument(document: Document){
    if(!document){
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
     this.httpClient.post<{ message: string, document: Document}>('http://localhost:3000/documents',
     document, { headers: headers })
     .subscribe(
      (responseData) => {
        this.documents.push(responseData.document);
        this.sortAndSend();
      }
     );
   }

   updateDocument(originalDocument: Document, newDocument: Document){
    if (!originalDocument || !newDocument){
      return;
    }
    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0){
      return;
    }
    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.httpClient.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      }
    );    

  }   
  deleteDocument(document: Document){
    if(!document){
      return;
    }
    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0){
    return;
  }
  this.httpClient.delete('http://localhost:3000/documents/' + document.id)
  .subscribe(
    (response: Response) => {
      this.documents.splice(pos, 1);
      this.sortAndSend();
    }
  );
}
}