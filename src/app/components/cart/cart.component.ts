import { Component, OnInit, Input } from '@angular/core';

import { CartItemModel } from '../../models/cart-item-model';
import { StorageService } from '../../services/storage.service';
import { environment } from '../../../environments/environment';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//pluggins
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from "ngx-spinner";

import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import { PaymentService } from 'src/app/services/payment.service';
import { MessageService } from 'src/app/services/message.service';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { PaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: false
})
export class CartComponent implements OnInit {

  imageUrl = environment.apiUrlMedia;

  @Input() cartItem: CartItemModel;

  cartItems = [];
  total = 0;
  value: string;
  id: number;

  product: Plan;

  public payPalConfig2?: IPayPalConfig;
  user: User;
  profileId: string;


  constructor(
    private messageService: MessageService,
    private storageService: StorageService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private profileService: ProfileService,
    private router: Router,
    private paymentService: PaymentService,
    private paypalService: PaypalSubcriptionService,
    private fb: FormBuilder,

  ) {

  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getProfileUser()
    this.initConfig();//paypal
    if (this.storageService.existCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.getItem();
    this.total = this.getTotal();
    this.closeModalCart();
    this.closeModalUser();
  }

  getProfileUser() {
    this.profileService.getByUser(this.user.uid).subscribe((resp: any) => {
      this.profileId = resp._id
    })
  }


  private initConfig(): void {
    this.payPalConfig2 = {
      currency: 'USD',
      clientId: environment.clientSubscripcionesSandboxId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          // CLAVE: Aquí enviamos el ID del perfil o usuario
          custom_id: `${this.profileId}|${this.getCartIdsString()}`,
          description: 'Compra única de artículos/servicio',
          amount: {
            currency_code: 'USD',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.getTotal().toString(),
              }
            }
          },
          items: this.getItemsList(),
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log('ID de la orden aprobado:', data.orderID);

        // Llamamos a tu backend para capturar el dinero de forma segura
        this.paypalService.ejecutaPago(data.orderID).subscribe({
          next: (res) => {
            console.log('¡Pago capturado con éxito por el servidor!', res);
            this.emptyCart();
            this.spinner.hide();
            this.router.navigate(['/user-account/', this.user.uid]);
          },
          error: (err) => {
            console.error('Error al capturar:', err);
            this.spinner.hide();
          }
        });

      },
      onClientAuthorization: (data) => {

        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));
        this.openModal(
          data.purchase_units[0],
          data.status,
          data.payer.email_address,
          data.payer.name.surname,
          data.payer.name.given_name,
          data.purchase_units[0].items,
          data.purchase_units[0].amount.value,
          data.purchase_units[0],

        );
        this.emptyCart();

        this.spinner.hide();

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      },
    };
  }

  getCartIdsString(): string {
    return this.cartItems.map(it => it.productId).join(',');
  }

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
        id: it.productId,
        quantity: it.quantity,
        category: 'DIGITAL_GOODS',
        description: it.description,
        unit_amount: {
          currency_code: 'USD',
          value: it.productPrice,
        },
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

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deletItem(i: number): void {
    if (this.cartItems[i].quantity > 1) {
      this.cartItems[i].quantity--;

    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
  openModal(id, status, email, name, surname, items, amount, created): void {
    const modalRef: BsModalRef = this.modalService.show(ModalComponent);
    modalRef.content.id = id;
    modalRef.content.status = status;
    modalRef.content.email = email;
    modalRef.content.surname = surname;
    modalRef.content.name = name;
    modalRef.content.items = items;
    modalRef.content.amount = amount;
    modalRef.content.created = created;
  }

  closeModalUser() {
    var modaluser = document.getElementsByClassName("user-modal");
    for (var i = 0; i < modaluser.length; i++) {
      modaluser[i].classList.remove("user-modal-active");

    }
  }

  closeModalCart() {
    var modalcart = document.getElementsByClassName("cart-modal");
    for (var i = 0; i < modalcart.length; i++) {
      modalcart[i].classList.remove("cart-modal-active");

    }
  }


}
