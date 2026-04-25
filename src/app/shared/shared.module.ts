import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SlidertopComponent } from './slidertop/slidertop.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { PipesModule } from '../pipes/pipes.module';
import { ComponentsModule } from '../components/components.module';
import { LoadingComponent } from './loading/loading.component';
import { PwaNotifInstallerComponent } from './pwa-notif-installer/pwa-notif-installer.component';



@NgModule({ declarations: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        SlidertopComponent,
        LoadingComponent,
        PwaNotifInstallerComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        SlidertopComponent,
        LoadingComponent,
        PwaNotifInstallerComponent
    ], imports: [
        CommonModule,
        RouterModule,
        PipesModule,
        ComponentsModule
    ], 
    providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }
