import { environment } from "src/environments/environment";
import { Post } from "./post";
import { User } from "./user";
import { subcriptionPaypal } from "./subcriptionPaypal";
import { Payment } from "./payment";
import { Favorite } from "./favorite";
const base_url = environment.mediaUrlRemoto;
export class Profile {


  constructor(

    public first_name: string,
    public last_name: string,
    public direccion: string,
    public pais: string,
    public estado: string,
    public ciudad: string,
    public telhome: string,
    public telmovil: string,
    public shortdescription: string,
    public emailPaypal: string,
    public nombrePaypal: string,
    // public emailBinance: string,
    // public userIdBinance: string,
    public redssociales: string,
    public paypalSubscriptionId: string,
    public plan: string,
    public fechaReinicio: Date,
    public subcription: subcriptionPaypal[] = [],
    public createdAt: Date,
    public updatedAt: Date,
    public articulosVistos?: number,
    public usuario?: User,
    public blog?: Post,
    public pagos?: Payment,
    public favoritos?: Favorite,
    public img?: string,
    public _id?: string

){}



  get imagenUrl(){

    if(!this.img){
      return `assets/img/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/profiles/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }
}

export class RedesSociales{
  constructor(
    public index?: string,
    public name_red?: string,
    public icono?: string,
    public usuario_red?: string,
  ){}
}
