import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Banner } from '../models/banner';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  public banner: Banner;

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
    const url = `${baseUrl}/banners`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, banners: Banner}) => resp.banners)
      )
  }

  getBanner(_id: string) {
    const url = `${baseUrl}/banners/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, banner: Banner}) => resp.banner)
        );
  }


  createBanner(banner:any) {
    const url = `${baseUrl}/banners/crear`;
    return this.http.post(url, banner, this.headers);

  }

   updateBanner(banner: Banner) {
    const url = `${baseUrl}/banners/editar/${banner._id}`;
    return this.http.put(url, banner, this.headers);

  }

  activar(banner: Banner):Observable<any> {
    const url = `${baseUrl}/banners/activar/${banner}`;
    return this.http.get(url, this.headers);

  }
  desactivar(banner: Banner):Observable<any> {
    const url = `${baseUrl}/banners/desactivar/${banner}`;
    return this.http.get(url, this.headers);

  }

  deleteBanner(banner: Banner) {
    const url = `${baseUrl}/banners/borrar/${banner}`;
    return this.http.delete(url, this.headers);
  }



}
