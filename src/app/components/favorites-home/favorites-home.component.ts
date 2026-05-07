import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-favorites-home',
  standalone:false,
  templateUrl: './favorites-home.component.html',
  styleUrl: './favorites-home.component.css'
})
export class FavoritesHomeComponent {

  private refreshSub: Subscription;
  
  usuario: User;
  loading = false;
  favoritos:Favorito[];
  blogs:Post;
  profile:any ={};

  private favoriteService = inject(FavoriteService);
  private profileService = inject(ProfileService);

  ngOnInit(){
     this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }
    if(this.usuario){
      this.listarfavoritessUser();
      // Nos suscribimos al "aviso" del servicio
    this.refreshSub = this.favoriteService.refresh$.subscribe(() => {
      this.listarfavoritessUser(); // Se ejecuta cuando el otro componente borra
    });
    }
  }


  listarfavoritessUser(){
    this.loading = true;
    this.favoriteService.listarUsuarioFavorites(this.usuario.uid).subscribe(
      response =>{
        this.favoritos = response;
        this.blogs = response.blog;
        this.loading = false;
      }
    );
    
  }

  ngOnDestroy() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe(); // Evita fugas de memoria
    }
  }

  getPerfilUsuario(){
    this.profileService.getByUser(this.usuario.uid).subscribe((resp:any)=>{
      this.profile = resp
    })
  }

  


}
