import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import {environment} from 'src/environments/environment';

@Component({
    selector: 'app-articles-follow',
    templateUrl: './articles-follow.component.html',
    styleUrls: ['./articles-follow.component.css'],
    standalone: false
})
export class ArticlesFollowComponent implements OnInit {

  slug: Post;
  error: string;
  tmpData: [];
  posts = signal<any[]>([]);
  loading = signal<boolean>(false);
  hasMore = signal<boolean>(true);
  page = 1;

  constructor(
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    // 1. Validaciones iniciales
    if (this.loading() || !this.hasMore()) return;

    this.loading.set(true);

    // 2. Llamada al servicio pasando la página actual
    this.postService.getDestacados(this.page).subscribe({
      next: (newData: Post[]) => {
        if (newData.length === 0) {
          this.hasMore.set(false);
        } else {
          // 3. Unir posts nuevos con los anteriores usando el operador spread
          this.posts.update(prev => [...prev, ...newData]);
          this.page++;
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        console.error("Error cargando posts");
      }
    });
  }

   onScroll(): void {
    if (this.loading() || !this.hasMore()) return;

    // Si hay búsqueda por TEXTO (query), normalmente el backend devuelve todo de golpe.
    // Pero si es por ESTATUS, queremos seguir bajando:
    this.page++;
    this.getPosts();
  }

 

}
