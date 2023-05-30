import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
import { Category } from '../models/category';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public post: Post;


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


  getPosts() {
    const url = `${baseUrl}/posts`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, posts: Post}) => resp.posts)
      )
  }

  getPost(post: Post) {
    const url = `${baseUrl}/post/show/${post}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, post: Post}) => resp.post)
        );
  }

  getRecentPosts() {
    const url = `${baseUrl}/posts/recientes`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, postrecientes: Post}) => resp.postrecientes)
      )
  }

  getFeaturedPosts() {
    const url = `${baseUrl}/posts/destacados`;
    return this.http.get<any>(url,this.headers)
      .pipe(
        map((resp:{ok: boolean, posts: Post}) => resp.posts)
      )
  }


  getPostByCategory(name: Category) {
    const url = `${baseUrl}/post/category/${name}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, posts: Post}) => resp.posts)
        );
  }

  getPostBySlug(slug: Post) {
    const url = `${baseUrl}/post/show/slug/${slug}`;
    return this.http.get<any>(url)
      .pipe(
        map((resp:{ok: boolean, post: Post}) => resp.post)
        );
  }


  deleteFoto(id) {
    return this.http.delete(baseUrl + '/post/delete-foto/' + id);
  }
}
