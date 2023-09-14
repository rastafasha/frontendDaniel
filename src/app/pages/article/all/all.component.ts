import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  posts: any;
  slug: Post;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  query:string ='';

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getPosts().subscribe(
      res =>{
        this.posts = res;
        error => this.error = error
        console.log(this.posts);
      }
    );
  }

  search() {
    return this.postService.search(this.query).subscribe(
      res=>{
        this.posts = res;
        if(!this.query){
          this.ngOnInit();
        }
      });
  }

}
