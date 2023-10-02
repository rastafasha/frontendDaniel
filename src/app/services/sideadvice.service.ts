import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Banner } from '../models/banner';
import { Sideadvice } from '../models/sideadvice';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SideadviceService {

  public sideadvertising: Sideadvice;
  public sideadvertisings: Sideadvice;

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


  getBanners()  {
    const url = `${baseUrl}/sideadvices`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, sideadvices: Sideadvice}) => resp.sideadvices)
      )
  }
  getBannerActivos()  {
    const url = `${baseUrl}/sideadvices/activos`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, sideadvices: Sideadvice}) => resp.sideadvices)
      )
  }

  getBanner(_id: string) {
    const url = `${baseUrl}/sideadvices/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, sideadvice: Sideadvice}) => resp.sideadvice)
        );
  }


  createBanner(sideadvice:any) {
    const url = `${baseUrl}/sideadvices/crear`;
    return this.http.post(url, sideadvice, this.headers);

  }

   updateBanner(sideadvice: Sideadvice) {
    const url = `${baseUrl}/sideadvices/editar/${sideadvice._id}`;
    return this.http.put(url, sideadvice, this.headers);

  }

  activar(sideadvice: Sideadvice):Observable<any> {
    const url = `${baseUrl}/sideadvices/activar/${sideadvice}`;
    return this.http.get(url, this.headers);

  }
  desactivar(sideadvice: Sideadvice):Observable<any> {
    const url = `${baseUrl}/sideadvices/desactivar/${sideadvice}`;
    return this.http.get(url, this.headers);

  }

  deleteBanner(sideadvice: Sideadvice) {
    const url = `${baseUrl}/sideadvices/borrar/${sideadvice}`;
    return this.http.delete(url, this.headers);
  }



}
