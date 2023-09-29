import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteItemModel, Favorito } from 'src/app/models/favoriter-item-model';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { subcriptionPaypal } from 'src/app/models/subcriptionPaypal';
import { User } from 'src/app/models/user';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PaymentService } from 'src/app/services/payment.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SubcriptionPaypalService } from 'src/app/services/subcriptionPaypal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  @Input() favoriteItem: FavoriteItemModel;
  favoriteItems: any[] = [];
  
  user:User;
  profile:Profile;
  blogs:Post;
  blogcomprados:Post;
  favoritos:Favorito;
  favorito:Favorito;
  pagos!: Payment;
  uid:User;
  subcriptionPaypal: subcriptionPaypal;
  pagosbl;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private pagoService: PaymentService,
    private postService: PostService,
    private favoriteService: FavoriteService,
    private subcriptionPaypalService: SubcriptionPaypalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getUser();
    this.closeModalProfile();
    this.activatedRoute.params.subscribe( ({id}) => this.listarBlogsUser(id));
    this.activatedRoute.params.subscribe( ({id}) => this.listarfavoritessUser(id));
  }
  
  getUserServer(id:string){
    if (id !== null && id !== undefined) {
      this.userService.getUserById(id).subscribe(
        res =>{
          this.user = res[0];
        }
        );
      }
      this.activatedRoute.params.subscribe( ({id}) => this.listar(id));

  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getUserSubcription(id));
    
    this.getUserPagos();
    if(!this.user || !this.user.role || this.user.role === null ){
       this.router.navigateByUrl('/login')
    }
    
  }

  getUserPagos(){

    this.pagoService.getPagosbyUser(this.user.uid).subscribe((data: any) => {
      this.pagos = data;
      this.blogcomprados = data[0].blog;
      // console.log(this.pagos);
      // console.log(this.blogcomprados);
     
    });

    
  }

  listar(id:string){
    if(!id == null || !id == undefined || id){
      this.profileService.listarUsuario(id).subscribe(
        response =>{
          this.profile = response[0];
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }

  listarBlogsUser(id:string){
    if(!id == null || !id == undefined || id){
      this.postService.getByUser(id).subscribe(
        response =>{
          this.blogs = response;
        }
      );
    }else{
      console.log('no hay registro')
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

  getUserSubcription(id:string){

    this.subcriptionPaypalService.getByUser(this.user.uid).subscribe((data: any) => {
      this.subcriptionPaypal = data;
    });
  }

  
  closeModalProfile(){
    var modalcart = document.getElementsByClassName("user-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.remove("show");

      }
  }


}
