import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
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

  info:any = {};
  cargada:boolean = false;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('auth_token') || '';
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token
      }
    }
  }

  get status(): 'PUBLISHED' | 'PENDING' | 'REJECTED' {
    return this.banner.status!;
  }


  getBanners()  {
    const url = `${baseUrl}/banners`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, banners: Banner}) => resp.banners)
      )
  }

  getBanner(id: number) {
    const url = `${baseUrl}/banner/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, banner: Banner}) => resp.banner)
        );
  }


}
