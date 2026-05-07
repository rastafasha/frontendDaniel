import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
declare const gapi: any;

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    standalone: false
})
export class RegistroComponent implements OnInit {

  email = new FormControl();
  password = new FormControl();
  remember = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loginError: string;
  error = null;

  public auth2: any;

  user: User;

  // Registro
  public formSumitted = false;
  public registerForm = this.fb.group({
    username: ['', Validators.required],
    email: [ '', [Validators.required] ],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    role: ['GUEST'],
    // terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
  // Registro

  errors:any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
  ) {

  }
  username: FormControl<any>;
ngOnInit(){

}




// Registro
// No olvides inyectar el Router en el constructor: private router: Router
crearUsuario() {
  this.formSumitted = true;

  if (this.registerForm.invalid) return;

  this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
    next: (resp: any) => {
      // 1. Guardamos el token para que ya esté logueado
      localStorage.setItem('token', resp.token);
      
      // 2. Obtenemos el UID (puedes sacarlo de la respuesta 'resp.usuario.uid' 
      // o del servicio si ya lo tienes procesado)
      const uid = resp.usuario.uid; 

      Swal.fire({
        title: '¡Cuenta creada!',
        text: 'Vamos a configurar tu perfil para activar tus 3 lecturas gratuitas.',
        icon: 'success',
        confirmButtonText: 'Configurar perfil'
      }).then(() => {
        // 3. Redirección dinámica usando el UID recibido
        this.router.navigateByUrl(`/dashboard/user-account/${uid}`);
      });
    },
    error: (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    }
  });

}



campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo).invalid && this.formSumitted){
    return true;
  }else{
    return false;
  }


}

aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSumitted;
}

passwordNoValido(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

passwordsIguales(pass1Name: string, pass2Name: string){
  return (formGroup: FormGroup) =>{
    const pass1Control = formGroup.get(pass1Name);
    const pass2Control = formGroup.get(pass2Name);

    if(pass1Control.value === pass2Control.value){
      pass2Control.setErrors(null)
    }else{
      pass2Control.setErrors({noEsIgual: true});
    }
  }
}
// Registro

goToLogin(){
  this.router.navigateByUrl('/login');
}
}
