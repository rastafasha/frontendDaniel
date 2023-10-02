import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  imageUrl = environment.apiUrlMedia;
  categories: Category;
  postrecientes: Post;
  editores: User;
  usuario: User;
  profiles: Profile;
  error: string;

  favoritos:any=[]=[];
  blogs:any=[]=[];
  favorito:Favorito;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private favoriteService: FavoriteService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.getPosts();
    this.getCategories();
    this.getEditors();
    this.getUser();
    
    // this.getProfiles();
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }
    if(this.usuario){
      this.listarfavoritessUser();
    }
  }

  listarfavoritessUser(){
    this.favoriteService.listarUsuarioFavorites(this.usuario.uid).subscribe(
      response =>{
        this.favoritos = response;
        this.blogs = response.blog;
      }
    );
    
  }

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getRecientes().subscribe(
      res =>{
        this.postrecientes = res;
        error => this.error = error
        // console.log(this.recentposts);
      }
    );
  }

  getCategories(): void {
    // return this.planesService.carga_info();
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categories = res;
        error => this.error = error
        // console.log(this.categories);
      }
    );
  }

  getEditors(): void {
    this.userService.getAllEditors().subscribe(
      res =>{
        this.editores = res;
        error => this.error = error
        // console.log(this.editores);
      }
    );
  }

  getProfiles(): void {
    this.profileService.getProfiles().subscribe(
      res =>{
        this.profiles = res;
        error => this.error = error
        // console.log(this.profiles);
      }
    );
  }

  
}
