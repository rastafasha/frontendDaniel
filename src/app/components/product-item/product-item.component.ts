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
import { ToastrService } from 'ngx-toastr';



@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css'],
    standalone: false
})
export class ProductItemComponent implements OnInit {

  @Input() product: Post;
  usuario;
  favoriteItem: Favorito;
  profile:Profile;
  subcriptionPaypal: subcriptionPaypal;

  imageUrl = environment.mediaUrlRemoto;

  favoritos:any=[]=[];
  blogs:any=[]=[];

  constructor(
    private messageService: MessageService,
    private messageFavoriteService: MessageFavoriteService,
    private favoriteService: FavoriteService,
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private subcriptionPaypalService: SubcriptionPaypalService,
    public toastr: ToastrService
    ) { 
      this.usuario = this.userService.usuario;
    }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    if(!this.usuario || !this.usuario.role || this.usuario.role === null ){
      // console.log('no hay role')
    }
    if(this.usuario){

      this.activatedRoute.params.subscribe( ({id}) => this.getUsuarioRemoto(id));
      this.activatedRoute.params.subscribe( ({id}) => this.getUserSubcription(id));
    }
    
  }
  
  getUserSubcription(id:string){

    this.subcriptionPaypalService.getByUser(this.usuario.uid).subscribe((data: any) => {
      this.subcriptionPaypal = data[0];
    });
  }

  getUsuarioRemoto(id:string){
  
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

  addToCart(): void{
    this.messageService.sendMessage(this.product);
    this.toastr.success('Artículo agregado al Carrito')
  }


  agregarLista(product:Post){
    
    const data = {
      blog: product._id,
      usuario: this.usuario.uid,
    }
    
    this.favoriteService.createFavorite(data ).subscribe((res:any)=>{
      this.favoriteItem = res;
      this.toastr.success('Artículo agregado a Favoritos')
      
    });
  }

  listarfavoritessUser(){
    this.favoriteService.listarUsuarioFavorites(this.usuario.uid).subscribe(
      response =>{
        this.favoritos = response;
        this.blogs = response.blog;
      }
    );
    
  }


}
