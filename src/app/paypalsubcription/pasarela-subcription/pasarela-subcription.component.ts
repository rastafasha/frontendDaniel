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

  private plans = [];
  public planes: planPaypalSubcription;
  public plan: planPaypalSubcription;
  public planpaypal: planPaypalSubcription;
  public planId: planPaypalSubcription;
  // public planId: any;
  public configs = {};
  subcriptionG: subcriptionGenerated;
  respuesta:any;

  error: string;

  // @ViewChild("PLAN mensual") basicSubscription?: NgxPaypalComponent;
  @ViewChild("advanced") advancedSubscription?: NgxPaypalComponent;

  public SubcriptionConfig ? : IPayPalConfig;

  // public payPalConfig?: IPayPalConfig;

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
    // this.getPlan();
    // this.iniciarPaypal();
    // const planId = this.activatedRoute.snapshot.paramMap.get('id');
    // this.activatedRoute.params.subscribe( ({id}) => this.iniciarPaypal(id));
    this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
    this.activatedRoute.params.subscribe( ({id}) => this.initConfig(id));

    // this.initConfig();
  
  }

  iniciarPaypal(){

    // const plan_id = id;


    let advancedSubscription = this.planpaypal.name

    // this.planes.map((planes) => {
    //   this.configs[planes.name] = this.getConfig(plan_id);
    // });
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
  
  // getConfig(plan_id: string): IPayPalConfig {
    
  //   // plan_id = 'P-1LF63986GX4401134MT6KMLQ'
  //   return {
  //     clientId: environment.paypalKey,
  //     currency: "USD",
  //     vault: "true",
  //     style: {
  //       label: "paypal",
  //       layout: "vertical",
  //       // size: "small",
  //       shape: "pill",
  //       color: "silver",
  //       tagline: false,
  //     },
  //     createSubscription: function (actions:any) {
        
  //       return actions.subscription.create({
  //         plan_id
  //       });
  //     },
      
  //     onApprove: function (data, actions) {
  //       console.log("subscription data:", data);
  //       actions.subscription.get().then((details) => {
  //         console.log("subscription details:", details);
  //         alert("Success to subscribe!");
  //       });

  //       this.openModal(
  //         data.orderID,
  //         data.payerID,
  //         data.subscriptionID

  //       );
  //     },
  //     onCancel: (data, actions) => {
  //       console.log("OnCancel", data, actions);
  //       this.router.navigateByUrl(`/cancel-payment`);
  //     },
  //     onError: (err) => {
  //       console.log("OnError", err);
  //       this.router.navigateByUrl(`/cancel-payment`);
  //     },
  //     onClick: (data, actions) => {
  //       console.log("Clicked:", data, actions);
  //     },
  //   };

    
  //   }


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
          // this.respuesta.subscriptionID
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


    

    

    getPlanes(): void {
    this.payPalService.getPlanPaypals().subscribe(
      res =>{
        this.planes = res.plans;
        error => this.error = error
        console.log(this.planes);
      }
    );
  }

  getPlan(id): void {
    this.payPalService.getPlanPaypal(id).subscribe(
      res =>{
        this.planpaypal = res;
        error => this.error = error;
        console.log(this.planpaypal);
      }
    );
  }

  openModal(amount, orderID, payerID, email, status): void{
    const modalRef = this.modalService.open(ModalsubcripcionComponent);
    
    modalRef.componentInstance.orderID = orderID;
    modalRef.componentInstance.amount = amount;
    modalRef.componentInstance.payerID = payerID;
    modalRef.componentInstance.email = email;
    modalRef.componentInstance.status = status;
    // modalRef.componentInstance.name = name;
    // modalRef.componentInstance.surname = surname;

  }

    
  
  }



   
  



