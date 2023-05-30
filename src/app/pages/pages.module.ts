import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { PerfilComponent } from './useraccount/perfil/perfil.component';
import { EditorComponent } from './editor/editor.component';
import { StaffpicsComponent } from './staffpics/staffpics.component';
import { RecommendedTopicComponent } from './recommended-topic/recommended-topic.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { WhotofollowComponent } from './whotofollow/whotofollow.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { CondicionesComponent } from './condiciones/condiciones.component';



@NgModule({
  declarations: [
    HomeComponent,
    ArticleComponent,
    PerfilComponent,
    EditorComponent,
    StaffpicsComponent,
    RecommendedTopicComponent,
    SubscriptionComponent,
    WhotofollowComponent,
    CarritoComponent,
    CondicionesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PipesModule,
    RouterModule,
    ComponentsModule,
  ]
})
export class PagesModule { }
