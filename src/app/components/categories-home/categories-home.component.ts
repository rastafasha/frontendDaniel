import { Component, inject } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories-home',
  standalone:false,
  templateUrl: './categories-home.component.html',
  styleUrl: './categories-home.component.css'
})
export class CategoriesHomeComponent {
   categories: Category;
   error: string;
   loading = false;
  private categoriaService = inject(CategoryService);

  ngOnInit(){
    this.getCategories();
  }

   getCategories(): void {
    this.loading = true;
    this.categoriaService.getCategories().subscribe(
      res =>{
        this.categories = res;
        error => this.error = error
        this.loading = false;
      }
    );
  }


}
