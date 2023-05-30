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

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  post: Post;
  error:string;
  slug:any;
  id: number;
  @Input() product: Post;

  public user: User;
  public identity: User;

  imagenSerUrl = environment.apiUrlMedia;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService
  ) { }

  ngOnInit() {

    window.scrollTo(0, 0);
    // this.activatedRoute.params.subscribe( ({slug}) => this.getPost(slug));
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    this.slug = slug;
    this.postService.getPostBySlug(this.slug).subscribe(
      res => {
        this.post = res[0];
        console.log(this.post);
      }
    );
      this.getUser();
    this.getUserServer();

  }

  // ngDoCheck(): void {
  //   this.identity = this.userService.user;
  // }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
  }

  getUserServer(){
    this.userService.getUserById(this.user.id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error
        console.log(this.user);
      }
    );
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }


}


