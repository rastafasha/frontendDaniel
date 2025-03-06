import { environment } from "src/environments/environment";
const base_url = environment.mediaUrlRemoto;

export class Sideadvice {
  constructor(

    public titulo: string,
    public target: string,
    public url: string,
    public status: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public img?: string,
    public _id?: string

){}


  get imagenUrl(){

    if(!this.img){
      return `${base_url}/sideadvertisings/no-image.jpg`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if(this.img){
      return `${base_url}/sideadvertisings/${this.img}`;
    }else {
      return `${base_url}/no-image.jpg`;
      // return `./assets/img/no-image.jpg`;
    }

  }

}
