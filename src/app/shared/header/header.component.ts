import { Component, OnInit,Input, } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

//cart
import { CartItemModel } from 'src/app/models/cart-item-model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
import { FavoriteItemModel, Favorito } from 'src/app/models/favoriter-item-model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MessageFavoriteService } from 'src/app/services/messageFavorite.service';

// import { UsuarioService } from 'src/app/services/usuario.service';
// import { Producto } from 'src/app/models/producto.model';

declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  imageUrl = environment.apiUrlMedia;

  public profile: Profile;
  public user: User;

  error: string;
  id: any ;
  roleid:number;

  role: User;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  @Input() favoriteItem: FavoriteItemModel;
  favoriteItems: any[] = [];
  total= 0;
  value: string;

  disabled: boolean;
  

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private messageFavoriteService: MessageFavoriteService,
    private storageService: StorageService,
    private favoriteService: FavoriteService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.disabled = true;
    
      this.getUser();
    // this.getUserServer();
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }

    this.getItem();
    this.total = this.getTotal();
    
    if(this.favoriteService.existFavorite()){
      this.favoriteItems = this.favoriteService.getFavorite();
    }
    
    this.getFavoriteItem();

    if(!this.profile || !this.profile.usuario){
      // this.router.navigateByUrl('/subcripciones')
   }
   

   
  }

  

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user || !this.user.role || this.user.role === null ){
       this.router.navigateByUrl('/login')
    }
    if(this.user ){
      this.router.navigateByUrl('/home')
   }

    this.listar()
  }

  getUserServer(){
    this.userService.getUserById(this.user.uid).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error
        // console.log(this.user);
      }
    );

  }

  logout(): void {
    this.userService.logout();
    this.router.navigateByUrl('/home');
    
  }

  refresh(): void {
    window.location.reload();
    
  }

  listar(){

    if(!this.user || !this.user.role || this.user.role === null || this.role === null){
      // console.log('no hay role')
      // this.user.role = 'USER';
    }else{
      this.profileService.listarUsuario(this.user.uid).subscribe(
        response =>{
          this.profile = response[0];
          // console.log('profileServer',this.profile);
        }
      );
    }

   
    
    
  }

  //cart
  getItem():void{
    this.messageService.getMessage().subscribe((product:Post)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product._id){
          exists = true;
          item.quantity++;
        }
      });
      if(!exists){
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);

      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);

    });
  }
  getItemsList(): any[]{

    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel)=>{
      item = {
        name: it.productName,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
        quantity: it.quantity,
        category: it.category,
      };
      items.push(item);
    });
    return items;
  }
  getTotal():number{
    let total =  0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  deletItem(i:number):void{
    if(this.cartItems[i].quantity > 1){
      this.cartItems[i].quantity--;

    }else{
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
    this.ngOnInit();
  }

  //modales
  openModalUser(){
    var modaluser = document.getElementsByClassName("user-modal");
      for (var i = 0; i<modaluser.length; i++) {
         modaluser[i].classList.add("user-modal-active");

      }
  }
  closeModalUser(){
    var modaluser = document.getElementsByClassName("user-modal");
      for (var i = 0; i<modaluser.length; i++) {
         modaluser[i].classList.remove("user-modal-active");

      }
  }

  openModalNotification(){
    var modalnotif = document.getElementsByClassName("notificacion-modal");
      for (var i = 0; i<modalnotif.length; i++) {
         modalnotif[i].classList.toggle("show");

      }
  }

  openModalCart(){
    var modalcart = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<modalcart.length; i++) {
        modalcart[i].classList.add("cart-modal-active");

      }
  }

  closeModalCart(){
    var modalcart = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.remove("cart-modal-active");

      }
  }

  openModalFavorites(){
    var modalfavorite = document.getElementsByClassName("favorite-modal");
      for (var i = 0; i<modalfavorite.length; i++) {
        modalfavorite[i].classList.toggle("show");

      }
  }

  // gotoCart(){
  //   return this.router.navigateByUrl('/cart')
  // }

  //favorites

  getFavoriteItem():void{
    this.messageFavoriteService.getMessage().subscribe((product:Post)=>{
      let existsFav = false;
      this.favoriteItems.forEach(itemFav =>{
        if(itemFav.productId === product._id){
          existsFav = true;
          itemFav.quantity++;
        }
      });
      if(!existsFav){
        const favoriteItem = new FavoriteItemModel(product);
        this.favoriteItems.push(favoriteItem);

      }
      this.favoriteService.setFavorite(this.favoriteItems);
    });

    // this.notificacion();
  }

  getFavoriteItemsList(): any[]{

    const itemFavss: any[] = [];
    let itemFav = {};
    this.favoriteItems.forEach((it: FavoriteItemModel)=>{
      itemFav = {
        name: it.productName,
        quantity: it.quantity,
        category: it.category,
        img: it.img,
      };
      itemFavss.push(itemFav);
    });
    return itemFavss;
  }

  deletFavoriteItem(i:number):void{
    if(this.favoriteItems[i].quantity > 1){
      this.favoriteItems[i].quantity--;

    }else{
      this.favoriteItems.splice(i, 1);
    }
    this.favoriteService.setFavorite(this.favoriteItems);
    this.favoriteService.deleteFavorito(this.favoriteItem);
    this.ngOnInit();
  }

  

}
