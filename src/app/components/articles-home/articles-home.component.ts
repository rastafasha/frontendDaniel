import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite';
import { Post } from 'src/app/models/post';
import { MessageService } from 'src/app/services/message.service';
import { PostService } from 'src/app/services/post.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css']
})
export class ArticlesHomeComponent implements OnInit {

  @Input() product: Post;
  @Input() favoriteItem: Favorite;
  blogs: any;
  slug: Post;
  post: Post;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  query:string ='';
  user;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private storageService: StorageService,
  ) { 
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.getPosts();
    // if(this.storageService.existFavorite()){
    //   this.favoriteItem = this.storageService.getFavorite();
    // }
    // this.getItem();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getRecientes().subscribe(
      res =>{
        this.blogs = res;
        error => this.error = error
        // console.log(this.blogs);
      }
    );
  }

  selectedPost(slug: Post){
    this.router.navigate(['/post/', slug])
  }

  addToFavorites(){
    console.log('sending...')
    localStorage.setItem('favorite', JSON.stringify(this.post));
  }


  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }





}
