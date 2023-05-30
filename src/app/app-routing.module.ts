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

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'subcripciones', component: SubscriptionComponent },
  { path: 'staff-pics', component: StaffpicsComponent },
  { path: 'recommended-topics', component: WhotofollowComponent },
  { path: 'who-to-follow', component: WhotofollowComponent },
  { path: 'login', component: LoginComponent },

  { path: 'editor/:id', component: EditorComponent },
  { path: 'user-account', component: PerfilComponent },
  { path: 'user-account/:id', component: PerfilComponent },
  //blog
  // { path: 'article', component: ArticleComponent },
  // { path: 'blog/:id', component: ArticleComponent },
  { path: 'blog/:slug', component: ArticleComponent },
  // { path: 'article/:name', component: ArticleComponent },
  // { path: 'blog/category/:id', component: PostByCategoryComponent },
  { path: '**', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
