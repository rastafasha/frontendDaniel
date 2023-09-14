import { Post } from './post';
export class Favorite {
    productId: string;
    productName: string;
    quantity:number;

    constructor(post: Post){
      this.productId= post._id;
      this.productName = post.name;
      this.quantity = 1;
    }
  }
