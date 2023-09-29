import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';  
import {
  PayPalScriptService,
  IPayPalConfig,
  NgxPaypalComponent,
  ICreateOrderRequest,
} from "ngx-paypal";
import { environment } from 'src/environments/environment';

import { PaypalSubcriptionService } from '../../services/paypalSubcription.service';
import { planPaypalSubcription, subcriptionGenerated } from 'src/app/models/planPaypalSubcription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsubcripcionComponent } from 'src/app/components/modalsubcripcion/modalsubcripcion.component';
import { plans } from "../../plans";
import { map } from 'rxjs/operators';

declare var paypal; 

@Component({
  selector: 'app-pasarela-subcription',
  templateUrl: './pasarela-subcription.component.html',
  styleUrls: ['./pasarela-subcription.component.css']
})
export class PasarelaSubcriptionComponent implements OnInit {

  @ViewChild('paypal') paypalElement: ElementRef;
  @ViewChild("advanced") advancedSubscription?: NgxPaypalComponent;

  private plans = [];
  public planes: planPaypalSubcription;
  public plan: planPaypalSubcription;
  public planpaypal: planPaypalSubcription;
  public planId: planPaypalSubcription;
  public configs = {};
  subcriptionG: subcriptionGenerated;
  respuesta:any;

  error: string;

  public SubcriptionConfig ? : IPayPalConfig;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private payPalScriptService: PayPalScriptService,
    private payPalService: PaypalSubcriptionService,
    ) {
    // this.plans = this.payPalService;
  }

  ngOnInit() { 
    this.getPlanes();
    this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
    this.activatedRoute.params.subscribe( ({id}) => this.initConfig(id));

    // this.initConfig();
  
  }

  iniciarPaypal(){
    let advancedSubscription = this.planpaypal.name;
    this.payPalScriptService.registerPayPalScript(
      {
        clientId: environment.paypalKey,
        currency: "USD",
        vault: "true",
      },
      (payPalApi) => {

        if (advancedSubscription) {
          this.advancedSubscription.customInit(payPalApi);
        }
        if (this.advancedSubscription) {
          this.advancedSubscription.customInit(payPalApi);
        }
      }
    );
  }
  

    private initConfig(id): void {
      const plan_id = id;
      this.SubcriptionConfig = {
        clientId: environment.paypalKey,
        currency: 'USD',
        // vault: "true",
      createSubscription: (actions) => {
        return actions.subscription.create({
          plan_id
        });
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        this.respuesta = data
        // actions.subscription.get().then((details) => {
        //   console.log("subscription details:", details);
        //   alert("Success to subscribe!");
        // });

        // this.openModal(
        //   data.orderID,
        //   data.payerID,
        //   data.subscriptionID,
        // );
        
        // this.router.navigateByUrl(`/gracias`);
        
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        // this.showSuccess = true;
        this.openModal(
          data.id,
          data.status,
          data.payer.email_address,
          data.payer.payer_id,
          data.purchase_units[0].amount.value,
          this.paypalplanId
        );
        this.router.navigateByUrl(`/gracias`);
        
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.router.navigateByUrl(`/cancel-payment`);
      },
      onError: err => {
        console.log('OnError', err);
        this.router.navigateByUrl(`/fallo`);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
    }
  
    paypalplanId(id: string, status: string, email_address: string, payer_id: string, value: string, subscriptionID: any, paypalplanId: any) {
      throw new Error('Method not implemented.');
    }


    getPlanes(): void {
    this.payPalService.getPlanPaypals().subscribe(
      res =>{
        this.planes = res.plans;
        error => this.error = error
        // console.log(this.planes);
      }
    );
  }

  getPlan(id): void {
    this.payPalService.getPlanPaypal(id).subscribe(
      res =>{
        this.planpaypal = res;
        error => this.error = error;
        // console.log(this.planpaypal);
      }
    );
  }

  openModal(orderID, status, email, payerID, amount, paypalplanId): void{
    const modalRef = this.modalService.open(ModalsubcripcionComponent);
    modalRef.componentInstance.orderID = orderID;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.email = email;
    modalRef.componentInstance.payerID = payerID;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.paypalplanId = this.planpaypal.id;
  }
  
}



   
  



