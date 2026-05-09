import { Component, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/profile';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { PaisService } from 'src/app/services/pais.service';
import { IconosService } from 'src/app/services/iconos.service';
import { Icons } from 'src/app/models/Icons';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
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
  isLoading = false;

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

  option_selectedd: number = 1;
    solicitud_selectedd: any = 1;

  public usuario: User;

  public perfilForm: FormGroup;
  public imagenSubir: File;
  public imgTemp: any = null;

  public direcciones : Profile[];
  redssociales: any; 
  name_red:string;
usuario_red:string;
icono:string;

listIcons:Icons;

  constructor(
    private location: Location,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private paisService: PaisService,
    private iconoService: IconosService,
    public toastr: ToastrService,

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
    
   
    this.getPaises();
    this.cargar_iconos();
    
  }

  getPaises(){
    this.paisService.getPaises().subscribe(
      res =>{
        this.paises = res;
        // console.log('paises',this.paises);
      }
    );
  }

  cargar_iconos() {
    this.iconoService.getIcons().subscribe(
      (resp: any) => {
        this.listIcons = resp.iconos;
        // console.log(this.listIcons.iconos)

      }
    )
  }
   addRedSocial() {
    if (this.redssociales) {
      this.redssociales.push({
        index: this.redssociales.length + 1,
        name_red: this.name_red,
        usuario_red: this.usuario_red,
        icono: this.icono
      });
    } else {
      this.redssociales = [
        {
          index: 1, // initial index
          name_red: this.name_red,
          usuario_red: this.usuario_red,
          icono: this.icono
        },
      ];
    }
    this.name_red = '';
    this.usuario_red = '';
    this.icono = '';
  }

  deleteRed(i: any) {
    this.redssociales.splice(i, 1);
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
          this.profile = response;
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
        (res:any) => {
          this.perfilForm.patchValue({
            _id: res._id,
            first_name: res.first_name,
            last_name: res.last_name,
            direccion: res.direccion,
            pais: res.pais,
            estado: res.estado,
            ciudad: res.ciudad,
            telhome: res.telhome,
            telmovil: res.telmovil,
            shortdescription: res.shortdescription,
            emailPaypal: res.emailPaypal,
            nombrePaypal: res.nombrePaypal,
            redssociales: res.redssociales,
            usuario: this.user.uid,
            img: res.img
          });
          this.profileSeleccionado = res;

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
      redssociales: [''],
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
  
  
  get nombrePaypal() {
    return this.perfilForm.get('nombrePaypal');
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
    .actualizarFoto(this.imagenSubir, 'profiles', this.profileSeleccionado._id)
    .then(img => { this.profileSeleccionado.img = img;
      this.toastr.success('Guardado', 'La imagen fue actualizada')
    }).catch(err =>{
      this.toastr.error('Error', 'No se pudo subir la imagen')
    })
    this.ngOnInit();
  }



  guardarPerfil() :void{
    if(!this.perfilForm.valid){
      //mostramos las alertas de los campos requeridos
      this.perfilForm.markAllAsTouched(); // Esto activa las validaciones visuales
      return
    }
    
    
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


    if (this.profileSeleccionado ) {
      const data = {
        ...this.perfilForm.value,
        _id: this.profileSeleccionado._id,
        usuario: this.user.uid,
        redssociales: this.redssociales
      }
      this.isLoading = true;
      this.profileService.updateProfile(data).subscribe(
        res => {
          this.isLoading = false;
            this.toastr.success('Guardado', 'Los cambios fueron actualizados')
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
      this.isLoading = true;
      this.profileService.createProfile(data).subscribe(
        res => {
          this.isLoading = false;
            this.toastr.success('Guardado', 'Información guardada');
            // this.ngOnInit();
            this.router.navigateByUrl(`/user-account/${this.user.uid}`);
        },
        error => this.errors = error
      );
    }
  }


  optionSelected(value: number) {
      this.option_selectedd = value;
      if (this.option_selectedd === 1) {
  
        // this.ngOnInit();
      }
      if (this.option_selectedd === 2) {
        this.solicitud_selectedd = null;
      }
    }





}
