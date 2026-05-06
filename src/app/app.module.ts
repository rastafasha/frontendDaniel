import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { PaypalsubcriptionModule } from './paypalsubcription/paypalsubcription.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PaywallInterceptor } from './http-interceptors/paypal-interceptor';


@NgModule({
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        SharedModule,
        PagesModule,
        ComponentsModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AuthModule,
        PaypalsubcriptionModule,
        NgxPayPalModule,
        ModalModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerImmediately'
        }),
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
        }),
    ], providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor, // Primero añade el Token
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: PaywallInterceptor, // Luego maneja errores de acceso/límites
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
