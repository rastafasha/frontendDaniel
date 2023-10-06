import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Favorito, FavoriteItemModel } from 'src/app/models/favoriter-item-model';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  
  @Input() favoriteItem: FavoriteItemModel;
  favoritos:Favorito;
  favorito:Favorito;
  favoriteItems: any[] = [];
  uid:User;
  user:User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.listarfavoritessUser(id));
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || this.user  === null ){
      this.router.navigateByUrl('/login')
   }
    
    
  }

  listarfavoritessUser(id:string){
    if(!id == null || !id == undefined || id){
      this.favoriteService.listarUsuarioFavorites(id).subscribe(
        response =>{
          this.favoritos = response;
          // console.log('favoritos', this.favoritos);
        }
      );
    }
    
  }

  deletFavoriteItem(_id:string):void{
    this.favoriteService.deleteFavorito(_id).subscribe(
        res=>{
          // console.log(res);
          this.ngOnInit();
  
        }
      );
    }

}
