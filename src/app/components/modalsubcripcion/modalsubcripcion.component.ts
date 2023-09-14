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
  @Input() payerID;
  @Input() subscriptionID;
  @Input() email;
  @Input() name;
  @Input() surname;
  @Input() status;
  @Input() plan_id;



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
    this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getPlan(id));
    this.procesarPagoPaypal(this.subscriptionID, this.email, this.name, 
      this.status, this.payerID, this.orderID, this.plan_id
      );

  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');
    // this.router.navigateByUrl('/user/historial-pagos');

  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
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


  procesarPagoPaypal(email:any, orderID: any, payerID: any, subscriptionID: any,
    status: any, amount: any, plan_id
    ){debugger
    //crear

    let data = {
      email,
      monto: this.planpaypal.fixed_price,
      orderID,
      payerID,
      subscriptionID,
      plan_id: this.planpaypal.id,
      status: 'APPROVED',
      usuario: this.user.uid,

    }
    if(data){
      this.subcriptionService.createSubcription(data).subscribe(
        subcriptionCreated =>{ 
          console.log(subcriptionCreated);
          Swal.fire('Gracias!', `gracias por subscribirte`, 'success');
          // this.getPlanes();
          
        
      });

    }

  }


}
