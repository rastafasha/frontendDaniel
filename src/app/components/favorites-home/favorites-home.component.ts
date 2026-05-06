import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorites-home',
  standalone:false,
  templateUrl: './favorites-home.component.html',
  styleUrl: './favorites-home.component.css'
})
export class FavoritesHomeComponent {

  usuario: User;
  loading = false;
  favoritos:Favorito[];
  blogs:Post;

  private favoriteService = inject(FavoriteService);

  ngOnInit(){
     this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }
    if(this.usuario){
      this.listarfavoritessUser();
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

  


}
