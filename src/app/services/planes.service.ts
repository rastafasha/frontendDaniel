import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Plan } from '../models/plan';
import { environment } from 'src/environments/environment';
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  public plan: Plan;
  private panes = 'assets/dataSimulada/plan.json';

  info:any = {};
  cargada:boolean = false;


  constructor(private http: HttpClient) { }

  get token():string{
    return localStorage.getItem('token') || '';
  }


  get headers(){
    return{
      headers: {
        'x-token': this.token
      }
    }
  }


  getPlanes()  {
    const url = `${baseUrl}/plans`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plans: Plan}) => resp.plans)
      )
  }

  getPlan(_id: string) {
    const url = `${baseUrl}/plans/${_id}`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, plan: Plan}) => resp.plan)
        );
  }


  createPlan(plan:Plan) {
    const url = `${baseUrl}/plans/crear`;
    return this.http.post(url, plan, this.headers);

  }

   updatePlan(plan: Plan) {
    const url = `${baseUrl}/plans/editar/${plan._id}`;
    return this.http.put(url, plan, this.headers);

  }

  deletePlan(_id: string) {
    const url = `${baseUrl}/plans/borrar/${_id}`;
    return this.http.delete(url, this.headers);
  }

  activar(plan: Plan):Observable<any> {
    const url = `${baseUrl}/plans/activar/${plan}`;
    return this.http.get(url, this.headers);

  }
  desactivar(plan: Plan):Observable<any> {
    const url = `${baseUrl}/plans/desactivar/${plan}`;
    return this.http.get(url, this.headers);

  }




}
