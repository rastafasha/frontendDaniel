import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
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
  usuario: User;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  query:string ='';

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getUser();
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getPostActivos().subscribe(
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

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }

  }

}
