import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { CargarUsuario } from '../auth/interfaces/cargar-usuarios.interface';

import {tap, map, catchError} from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';

const base_url = environment.apiUrl;
const userGoogle = environment.clientGoogle

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public usuario: User | null = null;
  public estaAutenticado = false;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
    ) {
      this.getLocalStorage();
  }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get role(): 'SUPERADMIN' | 'ADMIN' | 'EDITOR' | 'USER'|'MEMBER' {
    return this.usuario?.role || 'USER';
  }

  get uid():string{
    return this.usuario?.uid || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }

  guardarLocalStorage(token: string, userData: any){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    this.getLocalStorage();  // Populate service state and emit
  }

  getLocalStorage() {
    const authStr = localStorage.getItem('estaAutenticado');
    this.estaAutenticado = authStr === 'true';
    
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const userData = JSON.parse(userStr);
        // Create User instance from parsed data (match JSON shape)
        this.usuario = new User(
          userData.username || '',
          userData.email || '',
          userData.terminos || false,
          undefined,  // password not stored
          userData.google || false,
          userData.role,
          userData.uid,
          userData.createdAt ? new Date(userData.createdAt) : undefined,
          userData.updatedAt ? new Date(userData.updatedAt) : undefined
        );
        this.currentUserSubject.next(this.usuario);
      } catch (e) {
        console.error('Error parsing user from localStorage:', e);
        this.usuario = null;
        this.currentUserSubject.next(null);
      }
    } else {
      this.usuario = null;
      this.currentUserSubject.next(null);
    }
  }

  getEstaAutenticado(): boolean {
    return this.estaAutenticado;
  }

  logout(){
    this.currentUserSubject.next(null);
    this.refresh();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('estaAutenticado');
    this.usuario = null;
    this.estaAutenticado = false;
    this.router.navigateByUrl('./login');
  }

  refresh(): void {
    window.location.reload();
    this.router.navigateByUrl('/home');
  }

  validarToken(): Observable<boolean>{

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { username, email, google, role, uid } = resp.usuario;

        this.usuario = new User(username, email, !!google, undefined, !!google, role, uid);
        this.guardarLocalStorage(resp.token, resp.user);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios/crear`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }

  crearEditor(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios/crearEditor`, formData)
    .pipe(
      tap((resp: any) => {
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }

  actualizarPerfil(data: {email: string, nombre: string, role: string}){

    data = {
      ...data,
      role: this.usuario?.role || 'USER'
    }

    return this.http.put(`${base_url}/usuarios/editar/${this.uid}`, data, this.headers);
  }

  update(user: User){
    return this.http.put(`${base_url}/usuarios/editar/${user.uid}`, user, this.headers);
  }

  login(formData: any){
    return this.http.post(`${base_url}/auth/login`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('estaAutenticado', 'true');
        this.guardarLocalStorage(resp.token, resp.user);
      })
    )
  }

  cargarUsuarios(desde: number = 0){

    const url = `${base_url}/usuarios?desde=${desde}`;
    return this.http.get<CargarUsuario>(url, this.headers)
      .pipe(
        map( resp =>{
          const usuarios = resp.usuarios.map(
            user => new User(
              user.username,
              user.email,
              user.terminos,
              '',
              user.google,
              user.role,
              user.uid
            ));

          return {
            total: resp.total,
            usuarios

          }
        })
      )
  }

  getUserById(_id: string)  {
    const url = `${base_url}/usuarios/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuario: User}) => resp.usuario)
        );
  }

  getUsuarios()  {
    const url = `${base_url}/usuarios/all`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: User[]}) => resp.usuarios)
      )
  }

  getRecientes()  {
    const url = `${base_url}/usuarios/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, usuarios: User[]}) => resp.usuarios)
      )
  }

  getAllEditors()  {
    const url = `${base_url}/usuarios/editores/`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, editores: User}) => resp.editores)
      )
  }

  deleteById(usuario: User){
    const url = `${base_url}/usuarios/delete/${usuario.uid}`;
    return this.http.delete(url, this.headers)
  }

  editarRole(usuario: User){
    return this.http.put(`${base_url}/usuarios/editarRole/${usuario.uid}`, usuario, this.headers);
  }

  cambiarMembresia(usuario: User){
    return this.http.put(`${base_url}/usuarios/activarMiembro/${usuario.uid}`, usuario, this.headers);
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");
      }
  }

  searchUsers(usuario:any):Observable<any>{
    const url = `${base_url}/todo/coleccion/usuarios/${usuario}`;
    return this.http.get<any>(url, this.headers)
  }

  set_recovery_token(email):Observable<any>{
    const url = `${base_url}/usuarios/user_token/set/${email}`;
    return this.http.get<any>(url, this.headers)
  }

  verify_token(email:string, codigo:string):Observable<any>{
    const url = `${base_url}/usuarios/user_verify/token/${email}/${codigo}`;
    return this.http.get<any>(url, this.headers)
  }

  change_password(email:string, data:any):Observable<any>{
    const url = `${base_url}/usuarios/user_password/change/${email}/${data}`;
    return this.http.put<any>(url, {}, this.headers)
  }

  forgotPassword(data:any):Observable<any>{
    const url = `${base_url}/usuarios/user_password/change/${data}`;
    return this.http.put<any>(url, {}, this.headers)
  }
}
