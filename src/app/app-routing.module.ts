import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './pages/article/article.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/useraccount/perfil/perfil.component';
import { EditorComponent } from './pages/editor/editor.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { StaffpicsComponent } from './pages/staffpics/staffpics.component';
import { WhotofollowComponent } from './pages/whotofollow/whotofollow.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ByCategoryComponent } from './pages/article/by-category/by-category.component';
import { AllComponent } from './pages/article/all/all.component';
import { GraciasComponent } from './paypalsubcription/gracias/gracias.component';
import { FalloComponent } from './paypalsubcription/fallo/fallo.component';
import { CancelPaymentComponent } from './paypalsubcription/cancel-payment/cancel-payment.component';
import { ExecutePaymentComponent } from './paypalsubcription/execute-payment/execute-payment.component';
import { AllPlansComponent } from './paypalsubcription/allplans/allplans.component';
import { PaymentDetailsComponent } from './pages/useraccount/payment-details/payment-details.component';
import { PasarelaSubcriptionComponent } from './paypalsubcription/pasarela-subcription/pasarela-subcription.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { CartComponent } from './components/cart/cart.component';
import { ProfileComponent } from './pages/useraccount/profile/profile.component';
import { RecommendedTopicComponent } from './pages/recommended-topic/recommended-topic.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  
  
  // { path: 'staff-pics', component: StaffpicsComponent },
  { path: 'recommended-topics', component: RecommendedTopicComponent },
  { path: 'who-to-follow', component: WhotofollowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },

  //blog
  { path: 'blogs', component: AllComponent },
  { path: 'blog/:slug', component: ArticleComponent },
  { path: 'blog/category/:id', component: ByCategoryComponent },
  
  
  { path: 'editor/:id', component: EditorComponent },
  
  { path: 'user-account', component: PerfilComponent },
  { path: 'user-account/:id', component: PerfilComponent },
  { path: 'user-account/edit/:id', component: ProfileComponent },
  { path: 'user-account/payment-detail/:id', component: PaymentDetailsComponent },
  { path: 'user/carrito', component: CartComponent },
  

  // { path: 'subcripciones', component: SubscriptionComponent },
  { path: 'subcripciones', component: AllPlansComponent },
  { path: 'pasarela-subcripcion/:id', component: PasarelaSubcriptionComponent },
  //pasarela-subcripcion/P-1PJ18025B84179353MTF4PKQ
  // { path: 'subscribir/:id', component: ArticleComponent },
  { path: 'gracias', component: GraciasComponent },
  { path: 'fallo', component: FalloComponent },
  { path: 'cancel-payment', component: CancelPaymentComponent },
  { path: 'execute-payment', component: ExecutePaymentComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
