import { Plan } from './plan';
import { Post } from './post';
import { User } from './user';
export class FavoriteItemModel {

    productId: string;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;
    category:string;
    img:string;
    usuario:User;

    constructor(product: Post){
      this.productId= product._id;
      this.productName = product.name;
      this.category = 'DIGITAL_GOODS';
      this.description = 'venta de articulo';
      // this.description = product.adicional;
      this.productPrice = product.price;
      this.quantity = 1;
      this.img = product.img;
    }

}
export class Favorito {

  constructor(

    public blog: Post,
    public usuario: User,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string

){}

    


}

