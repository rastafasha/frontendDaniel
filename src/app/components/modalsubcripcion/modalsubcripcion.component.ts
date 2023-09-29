import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { planPaypalSubcription, subcriptionGenerated } from 'src/app/models/planPaypalSubcription';
import { SubcriptionPaypalService } from 'src/app/services/subcriptionPaypal.service';
import Swal from 'sweetalert2';
import { PaypalSubcriptionService } from 'src/app/services/paypalSubcription.service';

@Component({
  selector: 'app-modalsubcripcion',
  templateUrl: './modalsubcripcion.component.html',
  styleUrls: ['./modalsubcripcion.component.css']
})
export class ModalsubcripcionComponent implements OnInit {

  
  // @Input() amount;
  @Input() orderID;
  @Input() status;
  @Input() email;
  @Input() amount;
  @Input() payerID;
  // @Input() subscriptionID;
  @Input() name;
  @Input() surname;
  @Input() paypalplanId;



  public PaymentRegisterForm: FormGroup;
  // paymentSeleccionado:Payment;
  subcriptionG: subcriptionGenerated;
  public planpaypal: planPaypalSubcription;
  error:string;

  pagopaypal;
  user:User;
  constructor(
    public activeModal:NgbActiveModal,
    public router: Router,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private userService: UserService,
    private subcriptionService: SubcriptionPaypalService,
    private payPalService: PaypalSubcriptionService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.user = userService.usuario
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
    this.getUser();
    this.procesarPagoPaypal(
      this.orderID, 
      this.status,
       this.email,
       this.payerID, 
       this.amount,
      this.paypalplanId, 
      // this.subscriptionID
      );

  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');

  }
  getPlan(paypalplanId): void {
    this.payPalService.getPlanPaypal(paypalplanId).subscribe(
      res =>{
        this.planpaypal = res;
        error => this.error = error;
        console.log(this.planpaypal);
      }
    );
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }



  procesarPagoPaypal(
    orderID: any, 
    status: any,
    email:any, 
    payerID: any, 
    amount: any,
    paypalplanId:any 
    ){
    //crear

    let data = {
      orderID,
      status,
      email,
      monto: amount,
      payerID,
      plan_id: paypalplanId,
      usuario: this.user.uid,

    }
    if(data){
      this.subcriptionService.createSubcription(data).subscribe(
        subcriptionCreated =>{ 
          console.log(subcriptionCreated);
          Swal.fire('Gracias!', `gracias por subscribirte`, 'success');
          this.cambiarRole();
        
      });

    }

  }

  cambiarRole(){
    if(this.user.role === 'USER'){
      this.userService.cambiarMembresia(this.user).subscribe(
        resp =>{ console.log(resp);
          // Swal.fire('Actualizado', `actualizado rol correctamente`, 'success');
        }
      )
    }
    
  }



}
