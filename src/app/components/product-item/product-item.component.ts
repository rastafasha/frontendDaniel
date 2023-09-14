import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Post;
  usuario

  imageUrl = environment.apiUrlMedia;

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    ) { 
      this.usuario = this.userService.usuario;
    }

  ngOnInit(): void {
    this.getUser();
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }

  }

}
