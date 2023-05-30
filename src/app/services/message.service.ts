import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject()

  constructor() { }

  sendMessage(product: Post):void{
    this.message.next(product);
  }

  getMessage(): Observable<any>{
    return this.message.asObservable();
  }
}
