import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  public payment: Payment[] =[];
  public pago: Payment;
  error: string;


  public paymentForm: FormGroup;
  public usuario: User;
  public pagos: Payment;
  user: User;

  pagoSeleccionado: Payment;

  public imagenSubir: File;
  public imgTemp: any = null;


  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private http: HttpClient,
    private fb: FormBuilder,
    private paymentsService: PaymentService,
    private usuarioService: UserService,
    private fileUploadService: FileUploadService,
    
  ) { 
    this.usuario = this.usuarioService.usuario
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
    this.activatedRoute.params.subscribe( ({id}) => this.cargarPayment(id));
    this.validarFormulario();
    this.getUser();
  }
  getUserPayment(_id:string){
    this.paymentService.getPagosbyUser(_id).subscribe(
      res =>{
        this.payment = res;
        error => this.error = error
        console.log(this.payment);
      }
    );
  }

  getUser(): void {

    this.usuario = JSON.parse(localStorage.getItem('user'));
    console.log(this.usuario);

  }

  getPagoById(_id:string){
    this.paymentService.getPagoById(_id).subscribe(
      res =>{
        this.pago = res;
        error => this.error = error;
        console.log(this.pago);
      }
    );
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  validarFormulario(){
    this.paymentForm = this.fb.group({
      status: ['',Validators.required],
      validacion: ['',Validators.required],
      user_id: [''],
    })
  }

  cargarPayment(_id: string){
    if (_id !== null && _id !== undefined) {
      this.paymentsService.getPagoById(_id).subscribe(
        res => {
          this.paymentForm.patchValue({
            id: res._id,
            status: res.status,
            validacion: res.validacion,
          });
          this.pagoSeleccionado = res;
          console.log(this.pagoSeleccionado);
        }
      );
    }

  }

  get status() {
    return this.paymentForm.get('status');
  }
  get validacion() {
    return this.paymentForm.get('validacion');
  }

  updatePago(){

    const formData = new FormData();
    formData.append('status', this.paymentForm.get('status').value);
    formData.append('validacion', this.paymentForm.get('validacion').value);

    if(this.pago){
      //actualizar
      const data = {
        ...this.paymentForm.value,
        _id: this.pagoSeleccionado._id
      }
      this.paymentsService.updateStatus(data).subscribe(
        resp =>{
          Swal.fire('Actualizado', ` actualizado correctamente`, 'success');
          this.ngOnInit();
        });

    }else{
      return;
    }

  }

  cambiarImagen(file: File){
    this.imagenSubir = file;

    if(!file){
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileUploadService
    .actualizarFoto(this.imagenSubir, 'pagos', this.pagoSeleccionado._id)
    .then(img => { this.pagoSeleccionado.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');

    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');

    })
  }

}
