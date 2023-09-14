import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Payment } from '../models/payment';
import { Post } from '../models/post';
import { Category } from '../models/category';

const base_url = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class BusquedasService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  private trasnformarUsuarios(resultados: any[]): User[] {
    return resultados.map(
      (user) =>
        new User(
          user.username,
          user.email,
          user.img,
          user.google,
          user.role,
          user.uid,
          user.profile,
          user.blog,
          user.pago,
        )
    );
  }

  private trasnformarPayments(resultados: any[]): Payment[] {
    return resultados;
  }
  private trasnformarPosts(resultados: any[]): Post[] {
    return resultados;
  }
  private trasnformarCategorias(resultados: any[]): Category[] {
    return resultados;
  }

  buscar(tipo: 'usuarios' | 'pagos' | 'blogs' | 'categorias', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((resp: any) => {
        switch (tipo) {
          case 'usuarios':
            return this.trasnformarUsuarios(resp.resultados);

          case 'pagos':
            return this.trasnformarPayments(resp.resultados);

          case 'blogs':
            return this.trasnformarPosts(resp.resultados);

          case 'categorias':
            return this.trasnformarCategorias(resp.resultados);
          default:
            return [];
        }
      })
    );
  }

  searchGlobal(termino: string) {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get<any[]>(url, this.headers);
  }
}
