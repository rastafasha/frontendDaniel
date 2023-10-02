import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-recommended-topic',
  templateUrl: './recommended-topic.component.html',
  styleUrls: ['./recommended-topic.component.css']
})
export class RecommendedTopicComponent implements OnInit {

  categories: Category;
  error:any;
  
  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getCategories();
  }

  getCategories(): void {
    // return this.planesService.carga_info();
    this.categoryService.getCategories().subscribe(
      res =>{
        this.categories = res;
        error => this.error = error
        // console.log(this.categories);
      }
    );
  }

}
