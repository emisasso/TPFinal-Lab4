import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../models';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  variableCompartida: boolean | undefined;

  setVariable(valor: any){
    this.variableCompartida= valor;
  }

  getVariable(){
    return this.variableCompartida;
  }

  constructor(private apiService: ApiService) { }

  /*public async checkAuth(email:string, password: string): Promise<boolean>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.getUserToAuth(email,password); // Recibo la respuesta de la api en forma de observable

      users = await lastValueFrom(apiResponse);// Transformo el observable en una promesa y espero a que se resuelva con el await. Lo que me devuelve es el User[] porque asi se puso en el apiService

    }catch(error){
      console.log(error);
    }

    return users.length == 1;
  }*/

  private user: User | null | undefined = null;

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  public async login(email: string, password: string): Promise<boolean> {

    let isLogin = false;

    try {

      let apiResponse = this.apiService.getUserToAuth(email, password);

      let userRespone = await lastValueFrom(apiResponse);

      this.user = userRespone[0];

      if (this.user) {
        localStorage.setItem('token', this.user.id!.toString());
        isLogin = true;
      }
    } catch (error) {
      throw error;
    }

    return isLogin;
  }


  public logout(){
    this.user = undefined;
    localStorage.clear();
  }

  public  static checkAuthentication(): boolean{
    return localStorage.getItem('token') ? true : false;
  }

}
