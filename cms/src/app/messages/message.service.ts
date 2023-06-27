import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

import { Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
 // messageSelectedEvent = new EventEmitter<Message>();  
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  messages: Message[] = [];
  maxMessagetId: number;

  constructor(private httpClient: HttpClient) {
    //this.messages = MOCKMESSAGES;
   }

   addMessage(message: Message){
    this.messages.push(message);
    this.messageListChangedEvent.next(this.messages.slice());
    this.storesMessages();
    
   }

   storesMessages(){
    let messages = JSON.parse(JSON.stringify(this.messages))
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    this.httpClient
    .put('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/messages.json',
     messages, { headers:headers })
    .subscribe(
      (response:Response) => {
        this.messageListChangedEvent.next(this.messages.slice());
        //this.sortAndSend();
      });
    }
    getMaxId(): number{
      let maxld = 0;
      for (let message of this.messages){
        const currentId = parseInt(message.id, 10);
        if (currentId > maxld){
          maxld = currentId;
        }
  
      }
      return maxld;
     }
   
   getMessage(id: string): Message {
    return this.messages.find((message) => message.id === id);
    /*for (let message of this.messages){
      if(message.id == id){
        return message
      }
    }    
    return null*/
     
   }
   getMessages() {
    this.httpClient
      .get('https://enable-the-api-7e4e7-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        //success method
        (messages: Message[]) => {
          this.messages = messages;

          this.maxMessagetId = this.getMaxId();

          //sort the list of messages
          this.messages.sort((a, b) => a.sender > b.sender ? 1 : b.sender > a.sender ? -1 : 0)
          //emit the next document list change event
          this.messageListChangedEvent.next(this.messages.slice())
          
        },
        //error method
        (error: any) => {
          console.log(error);
  
        }
      );
      }  
   }
