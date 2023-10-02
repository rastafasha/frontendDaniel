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
import { FavoriteService } from 'src/app/services/favorite.service';
import { Favorito } from 'src/app/models/favoriter-item-model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  // @Input() favoriteItem: Favorite;
  product: Post;
  blog: Post;
  error:string;
  slug:any;
  usuario:User;
  blogusuario:User;
  uid: string;
  role: User;
  // @Input() product: Post;

  public user: User;
  public identity: User;
  favoriteItem: Favorito;

  imagenSerUrl = environment.apiUrlMedia;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private favoriteService: FavoriteService,
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
        this.blogusuario = res.usuario;
        // console.log(this.blog);
      }
    );


    }
    
      
  getUser(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null || this.role === null){
      // console.log('no hay role')
      // this.user.role = 'USER';
    }
  }

  getUserServer(){
    this.userService.getUserById(this.user.uid).subscribe(
      res =>{
        this.user = res;
        error => this.error = error
        // console.log(this.user);
      }
    );
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  addToFavorites(){
    const data = {
      // ...this.product,
      blog: this.product._id,
      usuario: this.usuario.uid,
    }
    

    this.favoriteService.createFavorite(data ).subscribe((res:any)=>{
      this.favoriteItem = res;
      // console.log(this.favoriteItem);
    });
  }


}


