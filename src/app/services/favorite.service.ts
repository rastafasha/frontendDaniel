import { Injectable } from '@angular/core';
import { FavoriteItemModel, Favorito } from '../models/favoriter-item-model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, Subject, map, tap } from 'rxjs';
import { Profile } from '../models/profile';
import { Post } from '../models/post';
import { Favorite } from '../models/favorite';

const baseUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  // Usamos Subject para emitir el evento de refresco
  private refreshSource = new Subject<void>();

  // Observable que los componentes escucharán
  refresh$ = this.refreshSource.asObservable();

  triggerRefresh() {
    this.refreshSource.next();
  }

  

  public user: User;
  public favorite: FavoriteItemModel;

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

  existFavorite():boolean{
    return localStorage.getItem('favorite') != null;
  }

  setFavorite(favorite: FavoriteItemModel[]): void{
    localStorage.setItem('favorite', JSON.stringify(favorite));
    
  }

  getFavorite(): FavoriteItemModel[]{
    return JSON.parse(localStorage.getItem('favorite'));

  }
  clear():void{
    localStorage.removeItem('favorite');
  }

  listarUsuarioFavorites(id:string):Observable<any>{
    const url = `${baseUrl}/favoritos/user_favorites/${id}`;
    return this.http.get<any>(url,this.headers)
    .pipe(
      map((resp:{ok: boolean, favoritos: Favorito}) => resp.favoritos)
    )

  }
  
  createFavorite(favorite: any) {
  const url = `${baseUrl}/favoritos/crear`;
  return this.http.post(url, favorite, this.headers).pipe(
    tap(() => {
      this.triggerRefresh(); // Esto avisará al sidebar automáticamente
    })
  );
}

 
  

  deleteFavorito(_id: any) {
    return this.http.delete(`${baseUrl}/favoritos/borrar/${_id}`).pipe(
      tap(() => {
        this.refresh$; // ¡Avisamos a todos!
      })
    );
  }


}
