import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Favorito } from 'src/app/models/favoriter-item-model';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { User } from 'src/app/models/user';
import { CategoryService } from 'src/app/services/category.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styleUrls: ['./by-category.component.css'],
  standalone: false
})
export class ByCategoryComponent implements OnInit {

  post: Post;
  slug: Post;
  usuario: User;
  error: string;
  imagenSerUrl = environment.apiUrlMedia;
  categoria: Category;
  title = 'Post por categoría:';
  favoriteItem: Favorito;
  esFavorito = false;
  profile:Profile;

  tmpData: [];
  posts = signal<any[]>([]);
  loading = signal<boolean>(false);
  hasMore = signal<boolean>(true);
  page = 1;

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private favoriteService: FavoriteService,
    public toastr: ToastrService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.usuario = JSON.parse(localStorage.getItem('user'));
    // this.getPosts();
    // Escuchamos el cambio de ID
    this.getPerfilUsuario();
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    this.activatedRoute.params.subscribe(({ id }) => {
      this.resetPagination(); // <--- REINICIAR AQUÍ
      this.getPosts(id);
      this.getCategory(id);
    });
  }

   getPerfilUsuario(){
    this.profileService.getByUser(this.usuario.uid).subscribe((resp:any)=>{
      this.profile = resp
    })
  }
  resetPagination() {
    this.posts.set([]);    // Vaciamos la lista
    this.page = 1;         // Volvemos a la página 1
    this.hasMore.set(true); // Reactivamos el scroll
  }

  getPosts(id: string): void {
    if (this.loading() || !this.hasMore()) return;

    this.loading.set(true);

    this.postService.getByCategoria(this.page, id).subscribe({
      next: (newData: Post[]) => {
        if (newData.length === 0) {
          this.hasMore.set(false);
        } else {
          // En Angular 19, 'update' es lo más eficiente para Signals
          this.posts.update(prev => [...prev, ...newData]);
          this.page++;
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  // Tu función de scroll debe capturar el ID actual de la URL
  onScroll(): void {
    const currentId = this.activatedRoute.snapshot.params['id'];
    this.getPosts(currentId);
  }


  getCategory(id): void {
    // return this.planesService.carga_info();
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.categoria = res;
        error => this.error = error
        // console.log(this.category);
      }
    );
  }





  addToFavorites(post: Post) {
    const data = {
      // ...this.product,
      blog: post._id,
      usuario: this.usuario.uid,
    }
    this.favoriteService.createFavorite(data).subscribe({
      next: (res: any) => {
        this.favoriteItem = res;
        this.toastr.success('¡Añadido a favoritos!');
        this.esFavorito = true;
        this.ngOnInit();
      },
      error: (err) => {
        // Aquí capturamos el error del backend
        // Si el backend envió res.status(400), el mensaje está en err.error.msg
        const mensaje = err.error?.msg || 'Error al guardar';
        this.toastr.warning(mensaje, 'Atención');
      }
    });
  }

}
