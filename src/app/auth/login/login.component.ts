import { AfterViewInit, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SplashscreenService } from 'src/app/services/splashscreen.service';
declare const gapi: any;


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit{

  errors:any = null;
  roles: string[] = [];
  public auth2: any;
  user: User;
  public currentStep: number = 1;
  isLoading = false;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });

  // Registro
  public formSumitted = false;

  public registerForm = this.fb.group({
    username: ['', Validators.required],
    email: [ '', [Validators.required] ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    roles: ['USER'],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'confirmPassword')

  });
  // Registro



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UserService,
    private ngZone: NgZone,
    private splashService:SplashscreenService
  ) {}
ngOnInit(){
  window.scrollTo(0, 0);
  setTimeout(() => {
    this.splashService.stop();
    // this.renderButton();
  }, 5000);

}

login(){
  this.isLoading = true;
  this.usuarioService.login(this.loginForm.value).subscribe(
      resp => {
        // console.log('Login response:', resp);
        // Set estaAutenticado always on success (for guard)
        localStorage.setItem('estaAutenticado', 'true');
        this.usuarioService.getLocalStorage();

        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/home');


        // this.router.navigateByUrl('/my-account');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    )



}


// refresh(): void {
//   window.location.reload();
// }

// renderButton() {
//   gapi.signin2.render('my-signin2', {
//     'scope': 'profile email',
//     'width': 240,
//     'height': 50,
//     'longtitle': true,
//     'theme': 'dark',
//   });
//   this.startApp();
// }

// async startApp(){
//   this.usuarioService.googleInit();
//   this.auth2 = this.usuarioService.auth2;

//   this.attachSignin(document.getElementById('my-signin2'));
// }

// attachSignin(element) {
//   this.auth2.attachClickHandler(element, {},
//       (googleUser) =>{
//         const id_token = googleUser.getAuthResponse().id_token;

//         this.usuarioService.loginGoogle(id_token).subscribe(
//           resp=>{

//             this.ngZone.run(()=>{
//               this.router.navigateByUrl('/home');
//             })
//           }
//         );


//       }, (error) =>{
//         alert(JSON.stringify(error, undefined, 2));
//       });
// }




// Registro

nextStep() {
    const username = this.registerForm.get('username');
    const email = this.registerForm.get('email');

    if (username?.invalid || email?.invalid) {
      username?.markAsTouched();
      email?.markAsTouched();
      return;
    }
    this.currentStep = 2;
  }

  prevStep() {
    this.currentStep = 1;
  }

crearUsuario() {
  this.formSumitted = true;
  if (this.registerForm.invalid) return;

  this.usuarioService.crearUsuario(this.registerForm.value).subscribe({
    next: (resp: any) => {
      // 1. IMPORTANTE: Guarda los datos que vienen en la respuesta (ajusta según tu backend)
      // Normalmente el backend devuelve { ok: true, usuario, token }
      if (resp.token && resp.usuario) {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.usuario));
      }

      // 2. Ahora sí actualizamos el estado del servicio
      this.usuarioService.getLocalStorage();

      // 3. Mostramos el Swal y redirigimos
      Swal.fire({
        title: '¡Gracias por Registrarte!',
        text: 'En breve te enviaremos a tu perfil para completar los datos requeridos',
        icon: 'success',
        timer: 3000, // Le damos 3 segundos para que lea el mensaje
        showConfirmButton: false
      }).then(() => {
        // Redirigimos después de que el Swal se cierre o pase el tiempo
        this.router.navigateByUrl('/user-account');
      });
    },
    error: (err) => {
      Swal.fire('Error', err.error.msg || 'No se pudo completar el registro', 'error');
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
  const pass2 = this.registerForm.get('confirmPassword').value;

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


  switchRegistrologin(){
    const container = document.querySelector(".logincontainer");
    container.classList.toggle("sign-up-mode");
  }

}
