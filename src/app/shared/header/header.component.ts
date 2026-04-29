import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

//cart
import { CartItemModel } from 'src/app/models/cart-item-model';
import { MessageService } from 'src/app/services/message.service';
import { StorageService } from 'src/app/services/storage.service';
import { Post } from 'src/app/models/post';
import { environment } from 'src/environments/environment';
import { FavoriteItemModel } from 'src/app/models/favoriter-item-model';
import { FavoriteService } from 'src/app/services/favorite.service';
import { MessageFavoriteService } from 'src/app/services/messageFavorite.service';

declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {

  imageUrl = environment.apiUrlMedia;

  public profile: Profile | null = null;
  public user: User | null = null;
  public usuario: User | null = null;

  error: string;
  id: any;
  roleid: number;

  @Input() cartItem: CartItemModel;
  cartItems: any[] = [];
  @Input() favoriteItem: FavoriteItemModel;
  favoriteItems: any[] = [];
  total = 0;
  value: string;

  disabled: boolean = false;

  private destroy$ = new Subject<void>();
  private userSubscription: any;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private messageService: MessageService,
    private messageFavoriteService: MessageFavoriteService,
    private storageService: StorageService,
    private favoriteService: FavoriteService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.disabled = true;

    // Subscribe to reactive user state from service
    this.userSubscription = this.userService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.usuario = user;
        this.disabled = false;
        
        if (this.user?.uid) {
          this.loadProfile();
        } else {
          this.profile = null;
          console.log('No user logged in');
        }
      });

    // Init cart
    if (this.storageService.existCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();

    // Init favorites
    if (this.favoriteService.existFavorite()) {
      this.favoriteItems = this.favoriteService.getFavorite();
    }
    this.getFavoriteItem();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  private loadProfile(): void {
    if (!this.user || !this.user.uid) return;
    this.profileService.getByUser(this.user.uid).subscribe({
      next: (resp: any) => {
        this.profile = resp;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.error = error;
        // Fallback to no-image
        this.profile = { img: null } as Profile;
      }
    });
  }

  logout(): void {
    this.userService.logout();
    this.closeModalUser();
  }

  refresh(): void {
    window.location.reload();
  }

  //cart methods unchanged
  getItem(): void {
    this.messageService.getMessage().subscribe((product: Post) => {
      let exists = false;
      this.cartItems.forEach(item => {
        if (item.productId === product._id) {
          exists = true;
          item.quantity++;
        }
      });
      if (!exists) {
        const cartItem = new CartItemModel(product);
        this.cartItems.push(cartItem);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }

  getItemsList(): any[] {
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel) => {
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

  getTotal(): number {
    let total = 0;
    this.cartItems.forEach(item => {
      total += item.quantity * item.productPrice;
    });
    return +total.toFixed(2);
  }

  deletItem(i: number): void {
    if (this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
    // Avoid recursive ngOnInit, just refresh carts
    if (this.storageService.existCart()) {
      this.cartItems = this.storageService.getCart();
    }
    if (this.favoriteService.existFavorite()) {
      this.favoriteItems = this.favoriteService.getFavorite();
    }
  }

  // Modal methods unchanged
  openModalUser() {
    var modaluser = document.getElementsByClassName("user-modal");
    for (var i = 0; i < modaluser.length; i++) {
      (modaluser[i] as HTMLElement).classList.add("user-modal-active");
    }
  }

  closeModalUser() {
    var modaluser = document.getElementsByClassName("user-modal");
    for (var i = 0; i < modaluser.length; i++) {
      (modaluser[i] as HTMLElement).classList.remove("user-modal-active");
    }
  }

  openModalNotification() {
    var modalnotif = document.getElementsByClassName("notificacion-modal");
    for (var i = 0; i < modalnotif.length; i++) {
      modalnotif[i].classList.toggle("show");
    }
  }

  openModalCart() {
    var modalcart = document.getElementsByClassName("cart-modal");
    for (var i = 0; i < modalcart.length; i++) {
      modalcart[i].classList.add("cart-modal-active");
    }
  }

  closeModalCart() {
    var modalcart = document.getElementsByClassName("cart-modal");
    for (var i = 0; i < modalcart.length; i++) {
      modalcart[i].classList.remove("cart-modal-active");
    }
  }

  openModalFavorites() {
    var modalfavorite = document.getElementsByClassName("favorite-modal");
    for (var i = 0; i < modalfavorite.length; i++) {
      modalfavorite[i].classList.toggle("show");
    }
  }

  getFavoriteItem(): void {
    this.messageFavoriteService.getMessage().subscribe((product: Post) => {
      let existsFav = false;
      this.favoriteItems.forEach(itemFav => {
        if (itemFav.productId === product._id) {
          existsFav = true;
          itemFav.quantity++;
        }
      });
      if (!existsFav) {
        const favoriteItem = new FavoriteItemModel(product);
        this.favoriteItems.push(favoriteItem);
      }
      this.favoriteService.setFavorite(this.favoriteItems);
    });
  }

  getFavoriteItemsList(): any[] {
    const itemFavss: any[] = [];
    let itemFav = {};
    this.favoriteItems.forEach((it: FavoriteItemModel) => {
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

  deletFavoriteItem(i: number): void {
    if (this.favoriteItems[i].quantity > 1) {
      this.favoriteItems[i].quantity--;
    } else {
      this.favoriteItems.splice(i, 1);
    }
    this.favoriteService.setFavorite(this.favoriteItems);
    this.favoriteService.deleteFavorito(this.favoriteItem);
    // Refresh favorites
    if (this.favoriteService.existFavorite()) {
      this.favoriteItems = this.favoriteService.getFavorite();
    }
  }

  darkmode(dark: string) {
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName('dark').length > 0;

    var dayNight = document.getElementsByClassName("dayNight");
    for (var i = 0; i < dayNight.length; i++) {
      dayNight[i].classList.toggle("active");
      body?.classList.toggle('dark');
      header?.classList.toggle('dark');
      aside?.classList.toggle('dark');
    }

    if (classExists) {
      localStorage.removeItem('dark');
    } else {
      localStorage.setItem('dark', dark);
    }
  }
}
