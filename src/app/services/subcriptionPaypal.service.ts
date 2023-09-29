import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { geSubcription, generateSubcription, planPaypalSubcription, productPaypalSubcription } from '../models/planPaypalSubcription';

const CLIENT = 'AQhKPBY5mgg0JustLJCcf6ncmd9RghCiNhXT_b6rNUakyQtnEn8MzCn_dkHAyt5n7_P0Omo5M05to5j0';
const SECRET = 'EFFuT6X5iP76O94nCeLrILzQCtCpqDc1EbBUMDKlj34B_55Pk_f4reWcvmFArH4oQklbeHZdsunITll0';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com';

const auth = { user: CLIENT, pass: SECRET };

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubcriptionPaypalService {

  public generateSubcription: generateSubcription;
  public subcription: geSubcription;

  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'X-PAYPAL-SECURITY-CONTEXT': '{"consumer":{"accountNumber":1181198218909172527,"merchantId":"5KW8F2FXKX5HA"},"merchant":{"accountNumber":1659371090107732880,"merchantId":"2J6QB8YJQSJRJ"},"apiCaller":{"clientId":"AdtlNBDhgmQWi2xk6edqJVKklPFyDWxtyKuXuyVT-OgdnnKpAVsbKHgvqHHP","appId":"APP-6DV794347V142302B","payerId":"2J6QB8YJQSJRJ","accountNumber":"1659371090107732880"},"scopes":["https://api-m.paypal.com/v1/subscription/.*","https://uri.paypal.com/services/subscription","openid"]}',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'PayPal-Request-Id': 'PRODUCT-18062019-001',
        'Prefer': 'return=representation'
      }
    }
  }


  getSubcriptions()  {
    const url = `${baseUrl}/subcriptionpaypal`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, subcription: geSubcription}) => resp.subcription)
      )
  }

  getSubcription(id: string) {
    const url = `${baseUrl}/subcriptionpaypal/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, subcription: geSubcription}) => resp.subcription)
        );
  }

  getByUser(usuario:any) {
    const url = `${baseUrl}/subcriptionpaypal/user_profile/${usuario}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, subcription: geSubcription}) => resp.subcription)
      )
  }


  createSubcription(subcription:any) {
    const url = `${baseUrl}/subcriptionpaypal/crear/`;
    return this.http.post(url, subcription, this.headers);

  }



  




}
