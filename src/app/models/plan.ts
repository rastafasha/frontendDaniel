// import { Currencies } from "./currencies";

export class Plan {

  constructor(
    
    public name: string,
    public price: number,
    public color: string,
    public description: string,
    public adicional: string,
    public tiempo: string,
    public createdAt: Date,
    public updatedAt: Date,
    public status: boolean,
    public _id?: string
  ){
    this._id = _id;
    this.name = name;
    this.price = price;
    this.color = color;
    this.description = description;
  }


}
