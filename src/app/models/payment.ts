import { Plan } from "./plan";
import { Post } from "./post";
import { User } from "./user";
import { environment } from "src/environments/environment";

const base_url = environment.apiUrlMedia;

export class Payment {
   constructor(

    public usuario: User,
    public blog: Post,
    public plan: Plan,
    public monto: string,
    public referencia: string,
    public validacion: string,
    public status: string,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string

){}

   get imagenUrl(){

      if(!this.img){
        return `${base_url}/pagos/no-image.jpg`;
      } else if(this.img.includes('https')){
        return this.img;
      } else if(this.img){
        return `${base_url}/pagos/${this.img}`;
      }else {
        return `${base_url}/pagos/no-image.jpg`;
      }

    }

}
