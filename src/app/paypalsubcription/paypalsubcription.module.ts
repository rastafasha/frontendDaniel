import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraciasComponent } from './gracias/gracias.component';
import { FalloComponent } from './fallo/fallo.component';
import { ExecutePaymentComponent } from './execute-payment/execute-payment.component';
import { CancelPaymentComponent } from './cancel-payment/cancel-payment.component';
import { AllPlansComponent } from './allplans/allplans.component';
import { PasarelaSubcriptionComponent } from './pasarela-subcription/pasarela-subcription.component';
import { ComponentsModule } from '../components/components.module';

import { FormsModule } from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GraciasComponent,
    FalloComponent,
    ExecutePaymentComponent,
    CancelPaymentComponent,
    AllPlansComponent,
    PasarelaSubcriptionComponent
  ],
  exports: [
    GraciasComponent,
    FalloComponent,
    ExecutePaymentComponent,
    CancelPaymentComponent,
    AllPlansComponent,
    PasarelaSubcriptionComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    NgxPayPalModule,
    RouterModule
  ]
})
export class PaypalsubcriptionModule { }
