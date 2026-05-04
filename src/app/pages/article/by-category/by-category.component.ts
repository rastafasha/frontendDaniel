import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PostService } from 'src/app/services/post.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-by-category',
    templateUrl: './by-category.component.html',
    styleUrls: ['./by-category.component.css'],
    standalone: false
})
export class ByCategoryComponent implements OnInit {

  posts: Post;
  post: Post;
  slug: Post;
  usuario: User;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  categoria: Category;
  title ='Post por categoría:';
  favoriteItem: Favorito;
  isLoading = false;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
     this.usuario = JSON.parse(localStorage.getItem('user'));
    // this.getPosts();
    this.activatedRoute.params.subscribe( ({id}) => this.getPosts(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getCategory(id));
  }

  getPosts(id): void {
    this.isLoading = true;
    this.postService.getByCategoria(id).subscribe(
      res =>{
        this.posts = res;
        error => this.error = error;
        this.isLoading = false;
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


  agregarLista(post:Post){
    
    const data = {
      blog: post._id,
      usuario: this.usuario.uid,
    }
    
    this.favoriteService.createFavorite(data ).subscribe((res:any)=>{
      this.favoriteItem = res;
      console.log(this.favoriteItem);
      // console.log('sending...', this.product.name)
      this.toastr.success('Artículo agregado a Favoritos')
      
    });
  }

}
