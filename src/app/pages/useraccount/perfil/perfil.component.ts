import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteItemModel, Favorito } from 'src/app/models/favoriter-item-model';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { Profile, RedesSociales } from 'src/app/models/profile';
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
  styleUrls: ['./perfil.component.css'],
  standalone: false
})
export class PerfilComponent implements OnInit {
  @Input() favoriteItem: FavoriteItemModel;
  favoriteItems: any[] = [];
  title = 'Perfil de Usuario'
  user: User;
  profile: Profile;
  blogs: Post;
  blogcomprados: Post;
  favoritos: Favorito;
  favorito: Favorito;
  pagos: Payment;
  uid: User;
  subcriptionPaypal: subcriptionPaypal;
  pagosbl;
  isLoading = false;
  isLoadingFavorite = false;
  isLoadingBlog = false;
  isLoadingSubs = false;
  isLoadingPagos = false;
  option_selectedd: number = 1;
    solicitud_selectedd: any = 1;

  redssociales: RedesSociales[] = [];

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
   this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user || this.user === null) {
      this.router.navigateByUrl('/login')
    }else{
      this.getProfile();
      
      // this.listarfavoritessUser();
    }
    this.closeModalProfile();
  }

  getUserServer() {
    this.userService.getUserById(this.user.uid).subscribe(
      res => {
        this.user = res;
      }
    );
  }

 

  getProfile() {
   this.profileService.listarUsuario(this.user.uid).subscribe(
        (resp: Profile) => {
          this.profile = resp;
          this.isLoading = false;
          if (typeof this.profile.redssociales === 'string') {
            this.redssociales = JSON.parse(this.profile.redssociales);
          } else {
            this.redssociales = this.profile.redssociales || [];
          }
          
          if(this.profile.blog ){
            this.listarBlogsUser();
          }
          if(this.profile.pagos ){
            this.getUserPagos();
          }
          if(this.profile.subcription ){
            this.getUserSubcription();
          }
          if(this.profile.favoritos ){
            this.listarfavoritessUser();
          }
      
        }
      );

  }

  listarBlogsUser() {
    this.isLoadingBlog = true;
    this.postService.getByUser(this.user.uid).subscribe(
      response => {
        this.blogs = response;
        this.isLoadingBlog = false;
      }
    );
   
  }
   getUserPagos() {
    this.isLoadingPagos = true;
    this.pagoService.getPagosbyUser(this.user.uid).subscribe((data: any) => {
      this.pagos = data;
      this.isLoadingPagos = false;
    });
  }

  listarfavoritessUser() {
    this.isLoadingFavorite = true;
    this.favoriteService.listarUsuarioFavorites(this.user.uid).subscribe(
      response => {
        this.favoritos = response;
        this.isLoadingFavorite = false;
      }
    );
   

  }

  deletFavoriteItem(_id: string): void {
    this.favoriteService.deleteFavorito(_id).subscribe(
      res => {
        // console.log(res);
        this.ngOnInit();

      }
    );
  }

  getUserSubcription() {
    this.isLoadingSubs = true;
    this.subcriptionPaypalService.getByUser(this.user.uid).subscribe((data: any) => {
      this.subcriptionPaypal = data;
      this.isLoadingSubs = false;
    });
  }


  closeModalProfile() {
    var modaluser = document.getElementsByClassName("user-modal");
    for (var i = 0; i < modaluser.length; i++) {
      modaluser[i].classList.remove("user-modal-active");

    }
  }

  optionSelected(value: number) {
      this.option_selectedd = value;
      if (this.option_selectedd === 1) {
  
        // this.ngOnInit();
      }
      if (this.option_selectedd === 2) {
        this.solicitud_selectedd = null;
      }
      if (this.option_selectedd === 3) {
        this.solicitud_selectedd = null;
      }
      if (this.option_selectedd === 4) {
        this.solicitud_selectedd = null;
      }
      if (this.option_selectedd === 5) {
        this.solicitud_selectedd = null;
      }
      if (this.option_selectedd === 6) {
        this.solicitud_selectedd = null;
      }
    }




}
