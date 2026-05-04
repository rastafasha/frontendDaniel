import { Component, OnInit, Input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Favorite } from 'src/app/models/favorite';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-articles-home',
  templateUrl: './articles-home.component.html',
  styleUrls: ['./articles-home.component.css'],
  standalone: false
})
export class ArticlesHomeComponent implements OnInit {

  @Input() product: Post;
  @Input() favoriteItem: Favorite;
  slug: Post;
  error: string;
  query: string = '';
  user;
  blogs: Post;
  blog: any;
  tmpData: [];
  posts = signal<any[]>([]);
  loading = signal<boolean>(false);
  hasMore = signal<boolean>(true);
  page = 1;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private router: Router,
  ) {
    this.user = this.userService.usuario;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    // 1. Validaciones iniciales
    if (this.loading() || !this.hasMore()) return;

    this.loading.set(true);

    // 2. Llamada al servicio pasando la página actual
    this.postService.getRecientes(this.page).subscribe({
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
