import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/user';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() id;
  @Input() status;
  @Input() email;
  @Input() name;
  @Input() surname;
  @Input() amount;
  @Input() items;
  @Input() created;



  public PaymentRegisterForm: FormGroup;
  paymentSeleccionado:Payment;

  pagopaypal;
  user:User;
  constructor(
    public activeModal:NgbActiveModal,
    public router: Router,
    private paymentService: PaymentService,
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.user = userService.usuario
  }

  ngOnInit(): void {
    this.getUser();
    this.procesarPagoPaypal(
      this.id, 
      this.status, 
      this.email, 
      this.name, 
      this.surname,
      this.amount, 
      this.items,
      );

  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/');

  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }


  procesarPagoPaypal(
    id: any, 
    status: any, 
    email: any, 
    name: any, 
    surname: any,
    amount: any, 
    items:any,
    ){
    //crear

    let data = {
      referencia: id,
      status: status,
      email,
      nombre: name,
      surname,
      monto: amount,
      blog: items,
      usuario: this.user.uid,
      validacion: 'APROVED',

    }
    if(data){
      this.paymentService.create(data)
      .subscribe( (resp: any) =>{
        // Swal.fire('Creado', `creado correctamente`, 'success');
        // this.router.navigateByUrl(`/user-account`);
        this.pagopaypal = resp;
        // console.log(this.pagopaypal);
      })

    }

  }


}
