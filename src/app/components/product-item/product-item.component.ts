import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Post } from 'src/app/models/post';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MessageFavoriteService } from 'src/app/services/messageFavorite.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { FavoriteItemModel, Favorito } from 'src/app/models/favoriter-item-model';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { ActivatedRoute } from '@angular/router';
import { SubcriptionPaypalService } from 'src/app/services/subcriptionPaypal.service';
import { subcriptionPaypal } from 'src/app/models/subcriptionPaypal';



@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: Post;
  usuario;
  favoriteItem: Favorito;
  profile:Profile;
  subcriptionPaypal: subcriptionPaypal;

  imageUrl = environment.apiUrlMedia;

  constructor(
    private messageService: MessageService,
    private messageFavoriteService: MessageFavoriteService,
    private favoriteService: FavoriteService,
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private subcriptionPaypalService: SubcriptionPaypalService,
    ) { 
      this.usuario = this.userService.usuario;
    }

  ngOnInit(): void {
    this.getUser();
    
  }

  addToCart(): void{
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }
    
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserSubcription(id));
  }

  getUserSubcription(id:string){

    this.subcriptionPaypalService.getByUser(this.usuario.uid).subscribe((data: any) => {
      this.subcriptionPaypal = data[0];
    });
  }

  listar(id:string){
  
    id = this.usuario.uid
    if(!id == null || !id == undefined || id){
      this.profileService.listarUsuario(id).subscribe(
        response =>{
          this.profile = response[0];
          // console.log('perfil', this.profile)
        }
      );
    }
    
  }

  agregarLista(){
    // console.log('sending...')
    // this.messageFavoriteService.sendMessage(this.product);

    const data = {
      // ...this.product,
      blog: this.product._id,
      usuario: this.usuario.uid,
    }
    

    this.favoriteService.createFavorite(data ).subscribe((res:any)=>{
      this.favoriteItem = res;
      // console.log(this.favoriteItem);
    });
  }

}
