import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {environment} from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @Input() favoriteItem: Favorite;
  product: Post;
  blog: Post;
  error:string;
  slug:any;
  usuario:User;
  uid: string;
  role: User;
  // @Input() product: Post;

  public user: User;
  public identity: User;

  imagenSerUrl = environment.apiUrlMedia;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService
  ) { 
    this.usuario = this.userService.usuario;
  }

  ngOnInit() {

    window.scrollTo(0, 0);
    // this.activatedRoute.params.subscribe( ({slug}) => this.getPost(slug));
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    this.slug = slug;

    this.getUser();

    this.postService.getBlogBySlug(slug).subscribe(
      res => {
        this.blog = res;
        console.log(this.blog);
      }
    );


    }
    
      
  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || !this.user.role || this.user.role === null || this.role === null){
      console.log('no hay role')
      // this.user.role = 'USER';
    }
  }

  getUserServer(){
    this.userService.getUserById(this.user.uid).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
        console.log(this.user);
      }
    );
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  addToFavorites(){
    console.log('sending...')
    localStorage.setItem('favorite', JSON.stringify(this.favoriteItem));
  }


}


