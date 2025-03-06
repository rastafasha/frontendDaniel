import { environment } from "src/environments/environment";
import { Category } from './category';
import { User } from "./user";
const base_url = environment.mediaUrlRemoto;
export class Post {
  slice(arg0: number, newLength: any): any {
    throw new Error('Method not implemented.');
  }
  length: any;
  constructor(

    public name: string,
    public adicional: string,
    public description: string,
    public introhome: string,
    public categoria: Category,
    public price: number,
    public slug: string,
    public status: boolean,
    public usuario: User,
    public isFeatured: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string

){}

  get imagenUrl(){

    if(!this.img){
      return `${base_url}/blogs/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/blogs/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}
