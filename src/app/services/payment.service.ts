import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment';


const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public pagos: Payment;
  public pago: Payment;

  info:any = {};
  cargada:boolean = false;

  //datos
  // payments = 'assets/dataSimulada/pago.json';

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }



  getAll(){
    const url = `${baseUrl}/pagos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment}) => resp.pagos)
      )
  }

  getPagoById(_id:string){
    const url = `${baseUrl}/pagos/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pago: Payment}) => resp.pago)
        );
  }

  create(pago:Payment){
    const url = `${baseUrl}/pagos/crear`;
    return this.http.post(url, pago, this.headers);
  }

  update(pago:Payment){
   const url = `${baseUrl}/pagos/editar/${pago._id}`;
    return this.http.put(url, pago, this.headers);
  }

  updateStatus(pago:Payment){
    const url = `${baseUrl}/pagos/updateStatus/${pago._id}`;
     return this.http.put(url, pago, this.headers);
   }


  delete(_id:string){
    const url = `${baseUrl}/pagos/borrar/${_id}`;
    return this.http.delete(url, this.headers);
  }

   getRecientes(){
    const url = `${baseUrl}/pagos/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment}) => resp.pagos)
      )
  }

  getPagosbyUser(usuario:string){

    const url = `${baseUrl}/pagos/user_pago/${usuario}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, pagos: Payment[]}) => resp.pagos)
        );
  }


  activar(pago: Payment):Observable<any> {
    const url = `${baseUrl}/pagos/activar/${pago._id}`;
    return this.http.get(url, this.headers);

  }
  desactivar(pago: Payment):Observable<any> {
    const url = `${baseUrl}/pagos/desactivar/${pago._id}`;
    return this.http.get(url, this.headers);

  }



  //pendiente

  aprobar(payment: Payment):Observable<any> {
    const url = `${baseUrl}/pagos/aprobar/${payment._id}`;
    return this.http.get(url, this.headers);

  }
  rechazar(payment: Payment):Observable<any> {
    const url = `${baseUrl}/pagos/rechazar/${payment._id}`;
    return this.http.get(url, this.headers);

  }

  findByReference(title): Observable<any> {
    return this.http.get(`${baseUrl}/payments/?title=${title}`);
  }


}
