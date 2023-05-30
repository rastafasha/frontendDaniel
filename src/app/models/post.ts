import { environment } from "src/environments/environment";
import { Category } from './category';
import { User } from "./user";
const base_url = environment.apiUrlMedia;
export class Post {

  id?: number;
  user_id: User;
  title?: string = "";
  description: string = "";
  adicional: string = "";
  isFeatured: boolean;
  slug: string = "";
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED';
  image: string = "";
  created_at?: any;
  updated_at?: any;
  price?: number;

  category_id: Category;
  categories: Category;
  name: Category;
  users: User;


  constructor(id, title, price, description  ){
    this.id = id;
    this.name = title;
    this.price = price;
    this.description = description;
  }


  get imagenUrl(){

    if(!this.image){
      return `${base_url}posts/no-image.jpg`;
    } else if(this.image.includes('https')){
      return this.image;
    } else if(this.image){
      return `${base_url}posts/${this.image}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}
