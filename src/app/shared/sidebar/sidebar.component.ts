import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    styleUrls: ['./sidebar.component.css'],
    standalone: false
})
export class SidebarComponent implements OnInit {

  imageUrl = environment.apiUrlMedia;
 
  postrecientes: Post;
  editores: User;
  usuario: User;
  profiles: Profile;
  error: string;
  role: string;
  loading = false;
  blogs:any=[]=[];
  favoritos: any[] = [];
  private subscription: Subscription;

  constructor(
    private postService: PostService,
    
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private favoriteService: FavoriteService

  ) { }

  ngOnInit(): void {
    // this.getPosts();
    this.getEditors();
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.role = this.usuario.role || null;
    // Nos suscribimos al canal de avisos
    this.subscription = this.favoriteService.refresh$.subscribe(() => {
      this.cargarDatos(); // Se recarga cuando el otro componente borra/agrega
    });

  }

  cargarDatos() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.favoriteService.listarUsuarioFavorites(user.uid).subscribe(res => {
        this.favoritos = res;
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Limpieza para evitar fugas de memoria
  }

  

  getPosts(): void {
    // return this.planesService.carga_info();
    this.postService.getRecientesSidebar().subscribe(
      res =>{
        this.postrecientes = res;
        error => this.error = error
        // console.log(this.recentposts);
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
