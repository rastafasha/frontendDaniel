import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import {environment} from 'src/environments/environment';
// import $ from 'jquery';
@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css']
})
export class ArticlesHomeComponent implements OnInit {

  @Input() product: Post;
  @Input() favoriteItem: Favorite;
  slug: Post;
  post: Post;
  error: string;
  // imagenSerUrl = environment.mediaUrlRemoto;
  query:string ='';
  user;

  blogs:Post;
  blog:any;
  tmpData:[];

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
  ) { 
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getRecientes().subscribe(
      res =>{
        this.blogs = res;
        error => this.error = error
      }
    );
  }

  selectedPost(slug: Post){
    this.router.navigate(['/post/', slug])
  }


  showMore() {
    let newLength = this.blogs.length + 2;
    if (newLength > this.product.length) {
        newLength = this.product.length
    }
     this.blogs = this.product.slice(0, newLength);
  }


}
