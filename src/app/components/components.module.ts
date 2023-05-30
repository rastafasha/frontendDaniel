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


@NgModule({
  declarations: [
    ArticlesHomeComponent,
    ArticlesFollowComponent,
    CartItemComponent,
    ProductItemComponent,
    ModalComponent,
    CartComponent
  ],
  exports: [
    ArticlesHomeComponent,
    ArticlesFollowComponent,
    CartItemComponent,
    ProductItemComponent,
    ModalComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    PipesModule,
    // NgxPayPalModule,

  ]
})
export class ComponentsModule { }
