import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { CategoryService } from 'src/app/services/category.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/message.service';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: false
})
export class ArticleComponent implements OnInit {
  product: Post;
  blog: Post;
  error: string;
  slug: any;
  usuario: User;
  blogusuario: User;
  uid: string;
  title: string;
  role: User;
  fullContent: boolean = false;
  limiteAlcanzado: boolean = false;
  articulosRestantes: number = 0;

  articulosVistos: number = 0;

  public user: User;
  public identity: User;
  favoriteItem: Favorito;
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private userService: UserService,
    private messageService: MessageService,
    private favoriteService: FavoriteService,
  ) {
    this.usuario = this.userService.usuario;
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.usuario = JSON.parse(localStorage.getItem('user'));
    this.activatedRoute.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params: ParamMap) => {
      const slug = params.get('slug');
      if (slug) {
        this.slug = slug;
        this.loadBlog(slug);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadBlog(slug: string) {
    this.isLoading = true;
    this.postService.getBlogBySlug(slug).subscribe({
      next: (resp: any) => {
        this.blog = resp.blog;
        this.blogusuario = resp.blog.usuario;
        this.fullContent = resp.fullContent;
        this.isLoading = false;
        // Si la lectura fue exitosa y descontó un crédito
        this.articulosVistos++;
        this.verificarLimite();
      },
      error: (err) => {
        if (err.status === 403 && err.error.limiteAlcanzado) {
          this.limiteAlcanzado = true;
          this.fullContent = false;
          this.blog = err.error.blog;
        }
        this.isLoading = false;
      }
    });
  }

  verificarLimite() {
    // 1. Calculamos si ya llegó al tope
    if (this.articulosVistos >= 3) {
      this.limiteAlcanzado = true;
    } else {
      this.limiteAlcanzado = false;
    }

    // 2. Opcional: Guardar en el LocalStorage para que sea instantáneo al recargar
    localStorage.setItem('articulosVistos', this.articulosVistos.toString());
  }

  addToCart(): void {
    console.log('sending...')
    this.messageService.sendMessage(this.product);
  }

  addToFavorites() {
    const data = {
      // ...this.product,
      blog: this.product._id,
      usuario: this.usuario.uid,
    }
    this.favoriteService.createFavorite(data).subscribe((res: any) => {
      this.favoriteItem = res;
      // console.log(this.favoriteItem);
    });
  }
}
