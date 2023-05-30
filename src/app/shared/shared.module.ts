import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlidertopComponent } from './slidertop/slidertop.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { CintamiembroComponent } from './cintamiembro/cintamiembro.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SlidertopComponent,
    CintamiembroComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SlidertopComponent,
    CintamiembroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PipesModule,
  ]
})
export class SharedModule { }
