import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesHomeComponent } from './articles-home/articles-home.component';
import { ArticlesFollowComponent } from './articles-follow/articles-follow.component';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CartItemComponent } from './cart-item/cart-item.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ModalComponent } from './modal/modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { CartComponent } from './cart/cart.component';
import { FormsModule } from '@angular/forms';
import { ModalCondicionesComponent } from './modal-condiciones/modal-condiciones.component';
import { ModalplansComponent } from './modalplans/modalplans.component';
import { ModalsubcripcionComponent } from './modalsubcripcion/modalsubcripcion.component';
import { ModalbinanceComponent } from './modalbinance/modalbinance.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { SideadvertisingComponent } from './sideadvertising/sideadvertising.component';
import { SplashComponent } from './splash/splash.component';
// import {ScrollingModule} from '@angular/cdk/scrolling';
@NgModule({
  declarations: [
    ArticlesHomeComponent,
    ArticlesFollowComponent,
    CartItemComponent,
    ProductItemComponent,
    ModalComponent,
    CartComponent,
    ModalCondicionesComponent,
    ModalplansComponent,
    ModalsubcripcionComponent,
    ModalbinanceComponent,
    SideadvertisingComponent,
    SplashComponent,
  ],
  exports: [
    ArticlesHomeComponent,
    ArticlesFollowComponent,
    CartItemComponent,
    ProductItemComponent,
    ModalComponent,
    CartComponent,
    ModalCondicionesComponent,
    ModalplansComponent,
    ModalbinanceComponent,
    SideadvertisingComponent,
    SplashComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PipesModule,
    FormsModule,
    NgxPayPalModule,
    // ScrollingModule

  ]
})
export class ComponentsModule { }
