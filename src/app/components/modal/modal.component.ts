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

  @Input() amount;
  @Input() items;
  @Input() id;
  @Input() email;
  @Input() name;
  @Input() surname;
  @Input() status;



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
    this.procesarPagoPaypal(this.id, this.email, this.name, this.surname,
      this.status, this.amount, this.items,
      );

  }

  closeModal(): void{
    this.activeModal.dismiss('Cross click');
    this.router.navigateByUrl('/user/historial-pagos');

  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }


  procesarPagoPaypal(id: any, email: any, name: any, surname: any,
    status: any, amount: any, items:any,
    ){debugger
    //crear

    let data = {
      id: id,
      email,
      nombre: name,
      surname,
      status: status,
      metodo: 'Paypal',
      bank_name: 'Paypal',
      monto: amount,
      blog: items.name,
      usuario: this.user.uid,
      validacion: 'PENDING',

    }
    if(data){
      // this.paymentService.create(data)
      // .subscribe( (resp: any) =>{
      //   // Swal.fire('Creado', `creado correctamente`, 'success');
      //   this.router.navigateByUrl(`/dashboard/historial-pagos`);
      //   this.pagopaypal = resp;
      //   console.log(this.pagopaypal);
      // })
      console.log("arreglar aqui")

    }

  }


}
