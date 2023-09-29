import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { FileUploadService } from 'src/app/services/file-upload.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  imagePath: string;
  error: string;
  uploadError: boolean;

  profileSeleccionado: Profile;
  pageTitle: string;

  userProfile:User;
  profile:Profile;
  profileId: string;
  _id:string;
  uid:string;

  passwordForm: FormGroup;
  errors:any = null;
  infoProfile: any;

  public formSumitted = false;

  public storage = environment.apiUrlMedia

  public url;
  public user : any = {};
  public paises;
  public file :File;
  public imgSelect : String | ArrayBuffer;
  public data_paises : any = [];
  public msm_error = false;
  public msm_success = false;
  public pass_error = false;

  public usuario: User;

  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;

  public direcciones : Profile[];

  constructor(
    private location: Location,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService

  ) {
    this.usuario = this.userService.usuario;
    this.profile = this.profileService.profile;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    // this.closeMenu();
    this.getUser();
    this.validarFormularioPerfil();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    
   
    // this.listar();
    
  }
  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getUser(): void {

    this.user = JSON.parse(localStorage.getItem('user'));
    // console.log('usuario',this.user);
  }


  getUserProfile(id:string){
    id = this.user.uid
    this.userService.getUserById(id).subscribe(
      res =>{
        this.usuario = res;
        error => this.error = error;
        // console.log('usuarioServer',this.usuario)
      }
    );
    
    this.activatedRoute.params.subscribe( ({id}) => this.listar(id));
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));

  }

  listar(id:string){
    if(!id == null || !id == undefined || id){
      this.profileService.listarUsuario(id).subscribe(
        response =>{
          this.profile = response[0];
          // console.log('profileServer',this.profile);
        }
      );
    }else{
      console.log('no hay registro')
    }
    
  }



  iniciarFormularioPerfil(id:string){
    if (!id == null || !id == undefined || id) {
      this.profileService.getByUser(id).subscribe(
        res => {
          this.perfilForm.patchValue({
            _id: res._id,
            first_name: this.profile.first_name,
            last_name: this.profile.last_name,
            direccion: this.profile.direccion,
            pais: this.profile.pais,
            estado: this.profile.estado,
            ciudad: this.profile.ciudad,
            telhome: this.profile.telhome,
            telmovil: this.profile.telmovil,
            shortdescription: this.profile.shortdescription,
            emailPaypal: this.profile.emailPaypal,
            nombrePaypal: this.profile.nombrePaypal,
            facebook: this.profile.facebook,
            instagram: this.profile.instagram,
            twitter: this.profile.twitter,
            linkedin: this.profile.linkedin,
            usuario: this.user.uid,
            img: this.profile.img
          });
          this.profileSeleccionado = res;
          console.log('profileSeleccionado',this.profileSeleccionado);

        }

      );
    } else {
      this.pageTitle = 'Crear Perfil';
    }



  }

  validarFormularioPerfil(){
    this.perfilForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      pais: [''],
      estado: [''],
      ciudad: [''],
      telhome: ['', Validators.required],
      telmovil: ['', Validators.required],
      shortdescription: ['', Validators.required],
      emailPaypal: [''],
      nombrePaypal: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      linkedin: [''],
      usuario: [this.user.uid],
      id: [''],
    });
  }

  get first_name() {
    return this.perfilForm.get('first_name');
  }

  get last_name() {
    return this.perfilForm.get('last_name');
  }

  get pais() {
    return this.perfilForm.get('pais');
  }
  get estado() {
    return this.perfilForm.get('estado');
  }
  get ciudad() {
    return this.perfilForm.get('ciudad');
  }
  get shortdescription() {
    return this.perfilForm.get('shortdescription');
  }
  get telmovil() {
    return this.perfilForm.get('telmovil');
  }
  get emailPaypal() {
    return this.perfilForm.get('emailPaypal');
  }
  get facebook() {
    return this.perfilForm.get('facebook');
  }
  get instagram() {
    return this.perfilForm.get('instagram');
  }
  get twitter() {
    return this.perfilForm.get('twitter');
  }
  get nombrePaypal() {
    return this.perfilForm.get('nombrePaypal');
  }
  get linkedin() {
    return this.perfilForm.get('linkedin');
  }
  get image() {
    return this.perfilForm.get('adicional');
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
    .actualizarFoto(this.imagenSubir, 'profiles', this.profile._id)
    .then(img => { this.profile.img = img;
      Swal.fire('Guardado', 'La imagen fue actualizada', 'success');
    }).catch(err =>{
      Swal.fire('Error', 'No se pudo subir la imagen', 'error');
    })
  }



  guardarPerfil() {

    
    const formData = new FormData();
     formData.append('first_name', this.perfilForm.get('first_name').value);
     formData.append('last_name', this.perfilForm.get('last_name').value);
     formData.append('pais', this.perfilForm.get('pais').value);
     formData.append('estado', this.perfilForm.get('estado').value);
     formData.append('ciudad', this.perfilForm.get('ciudad').value);
     formData.append('telhome', this.perfilForm.get('telhome').value);
     formData.append('telmovil', this.perfilForm.get('telmovil').value);
     formData.append('shortdescription', this.perfilForm.get('shortdescription').value);
     formData.append('emailPaypal', this.perfilForm.get('emailPaypal').value);
     formData.append('facebook', this.perfilForm.get('facebook').value);
     formData.append('instagram', this.perfilForm.get('instagram').value);
     formData.append('twitter', this.perfilForm.get('twitter').value);
     formData.append('linkedin', this.perfilForm.get('linkedin').value);


    if (this.profile ) {
      const data = {
        ...this.perfilForm.value,
        _id: this.profile._id,
        usuario: this.user.uid,
      }
      this.profileService.updateProfile(data).subscribe(
        res => {
            Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
            // this.ngOnInit();
            this.router.navigateByUrl(`/user-account/${this.user.uid}`);
        },
        error => this.errors = error
      );
    } else {
      const data = {
        ...this.perfilForm.value,
        usuario: this.user.uid
      }
      this.profileService.createProfile(data).subscribe(
        res => {
            Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            // this.ngOnInit();
            this.router.navigateByUrl(`/gracias`);
        },
        error => this.errors = error
      );
    }
    return false;
  }




}
