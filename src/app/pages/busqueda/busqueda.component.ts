import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Payment } from 'src/app/models/payment';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { BusquedasService } from 'src/app/services/busqueda.service';

import { Location } from '@angular/common';
import { planPaypalSubcription } from 'src/app/models/planPaypalSubcription';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  

  categorias: Category;
  usuarios: User;
  blogs: Post;
  pagos: Payment;
  subcriptions: planPaypalSubcription;

  query:string ='';

  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedasService: BusquedasService,
    private location: Location,
     ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      ({termino}) => {
        this.busquedaGlobal(termino);
      }
    )
  }


  busquedaGlobal(termino: string){
    this.busquedasService.searchGlobal(termino).subscribe(
      (resp:any) => {
        this.usuarios = resp.usuarios;
        this.categorias = resp.categorias;
        this.blogs = resp.blogs;
        this.pagos = resp.pagos;
        this.subcriptions = resp.subcriptions;
      }
    )
  }

  search() {

    return this.busquedasService.searchGlobal(this.query).subscribe(
      (resp:any) => {
      this.categorias = resp.categorias;
      this.blogs = resp.blogs;
    
        
      }
    )
    
        
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
