import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import { Observable } from 'rxjs';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public blog: Post;


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


  getPosts() {
    const url = `${baseUrl}/blogs/`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }
  getPostActivos() {
    const url = `${baseUrl}/blogs/activos/`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }

  getPost(blog: any) {
    const url = `${baseUrl}/blogs/${blog}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, blog: Post}) => resp.blog)
        );
  }

  getRecientes() {
    const url = `${baseUrl}/blogs/recientes`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }

  getDestacados() {
    const url = `${baseUrl}/blogs/destacados`;
    return this.http.get<any>(url, )
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }

  getBySlug(slug:string) {
    const url = `${baseUrl}/blogs/find_by_slug/${slug}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }

  getBlogBySlug(slug:string) {
    const url = `${baseUrl}/blogs/find_by_slug/${slug}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blog: Post}) => resp.blog)
      )
  }

  getByUser(usuario:string) {
    const url = `${baseUrl}/blogs/user_blog/${usuario}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }

  getByCategoria(nombre:any) {
    const url = `${baseUrl}/blogs/blog_categoria/${nombre}`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, blogs: Post}) => resp.blogs)
      )
  }


  createPost(blog:any) {
    const url = `${baseUrl}/blogs/crear`;
    return this.http.post(url, blog, this.headers);
  }

  updatePost(blog:Post) {
    const url = `${baseUrl}/blogs/editar/${blog._id}`;
    return this.http.put(url, blog, this.headers);
  }

  activar(blog: Post):Observable<any> {
    const url = `${baseUrl}/blogs/activar/${blog}`;
    return this.http.get(url, this.headers);

  }
  desactivar(blog: Post):Observable<any> {
    const url = `${baseUrl}/blogs/desactivar/${blog}`;
    return this.http.get(url, this.headers);

  }

  deletePost(blog: any) {
    const url = `${baseUrl}/blogs/borrar/${blog}`;
    return this.http.delete(url, this.headers);
  }

  //pendiente
  search(query=''){
    return this.http.get(`${baseUrl}/blogs/search`, {params: {buscar: query}})

  }
}
