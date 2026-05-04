import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesHomeComponent } from './articles-home/articles-home.component';
import { ArticlesFollowComponent } from './articles-follow/articles-follow.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
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
import { CategoriesHomeComponent } from './categories-home/categories-home.component';
import { FavoritesHomeComponent } from './favorites-home/favorites-home.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({ declarations: [
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
        CategoriesHomeComponent,
        FavoritesHomeComponent
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
        CategoriesHomeComponent,
        FavoritesHomeComponent
    ], imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        FormsModule,
        NgxPayPalModule,
        InfiniteScrollModule
    ], 
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ComponentsModule { }
