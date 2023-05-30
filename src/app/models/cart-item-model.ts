import { Post } from './post';
export class CartItemModel {

    productId: number;
    productName: string;
    productPrice:number;
    description:string;
    quantity:number;
    category:string;

    constructor(product: Post){
      this.productId= product.id;
      this.productName = product.title;
      this.category = 'DIGITAL_GOODS';
      this.description = product.description;
      this.productPrice = product.price;
      this.quantity = 1;
    }

}

