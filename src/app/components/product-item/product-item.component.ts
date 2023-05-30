import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Post;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

}
