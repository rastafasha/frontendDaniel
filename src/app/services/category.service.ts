import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category: Category;


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


  getCategories() {
    const url = `${baseUrl}/categories`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, categories: Category}) => resp.categories)
      )
  }

  getCategory(id:number) {
    const url = `${baseUrl}/category/show/${id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, category: Category}) => resp.category)
        );
  }

}
