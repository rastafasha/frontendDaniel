import { Plan } from './plan';
import { Post } from './post';
export class CartItemModel {

    productId: string;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;
    category:string;
    img:string;

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

