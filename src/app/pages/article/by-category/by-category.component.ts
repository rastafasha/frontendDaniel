import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css']
})
export class ByCategoryComponent implements OnInit {

  posts: Post;
  slug: Post;
  usuario: User;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  categoria: Category;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUser();
    // this.getPosts();
    this.activatedRoute.params.subscribe( ({id}) => this.getPosts(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getCategory(id));
  }

  getPosts(id): void {
    this.postService.getByCategoria(id).subscribe(
      res =>{
        this.posts = res;
        error => this.error = error
        // console.log(this.posts);
      }
    );
  }

  getCategory(id): void {
    // return this.planesService.carga_info();
    this.categoryService.getCategory(id).subscribe(
      res =>{
        this.categoria = res;
        error => this.error = error
        // console.log(this.category);
      }
    );
  }

  selectedPost(slug: Post){
    this.router.navigate(['/post/', slug])
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }

  }

}
