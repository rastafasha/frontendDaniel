import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Post } from '../models/post';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message = new Subject()

  

  sendMessage(product: Post):void{
    this.message.next(product);
    
  }

  getMessage(): Observable<any>{
    return this.message.asObservable();
  }
}
