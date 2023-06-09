import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-articles-follow',
  templateUrl: './articles-follow.component.html',
  styleUrls: ['./articles-follow.component.css']
})
export class ArticlesFollowComponent implements OnInit {

  posts: Post;
  slug: Post;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getFeaturedPosts().subscribe(
      res =>{
        this.posts = res;
        error => this.error = error
        console.log(this.posts);
      }
    );
  }

  selectedPost(slug: Post){
    this.router.navigate(['/post/', slug])
  }

}
