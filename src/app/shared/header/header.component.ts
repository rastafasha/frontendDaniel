import { Component, OnInit,Input, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

//cart
import { CartItemModel } from 'src/app/models/cart-item-model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { Post } from 'src/app/models/post';
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

  public profile: Profile;
  public user: User;

  error: string;
  id: any;
  roleid:number;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  total= 0;
  value: string;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private storageService: StorageService,
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
    // this.getUserServer();
    this.getUser();
    if(this.storageService.existCart()){
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
  }


  openModal(){

    var modalcart = document.getElementsByClassName("user-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }

  openModalNotification(){

    var modalcart = document.getElementsByClassName("notificacion-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }
  openModalCart(){

    var modalcart = document.getElementsByClassName("cart-modal");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    this.id = this.user.id;
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
  }

  getUserServer(id:number){
    this.userService.getUserById(+id).subscribe(
      res =>{
        this.user = res[0];
        error => this.error = error
        console.log(this.user);
      }
    );
  }

  logout(): void {
    this.accountService.logout();
  }


  //cart


  getItem():void{
    this.messageService.getMessage().subscribe((product:Post)=>{
      let exists = false;
      this.cartItems.forEach(item =>{
        if(item.productId === product.id){
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

}
