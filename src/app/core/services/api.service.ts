import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Movie, MovieResponse, User } from '../models';




@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private jsonURL = 'http://localhost:3000';
  private trending: string = "/trending/all/day?language=es-ES";
  private baseUrl: string= " https://api.themoviedb.org/3";
  private apiKey: string = "&api_key=ade394b4bf6e4e95b4cb1c1d43588ef3";
  private filtrar: string = "/discover/movie?language=es";
  private genero:string = "&with_genres=";
  private page: string = "&page=";

  constructor(private http: HttpClient) { }

 
  //Metodos de Usuarios
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.jsonURL}/users`);
  }

  getUserToAuth(email:string, password: string): Observable<User[]>{
    return this.http.get<User[]>(`${this.jsonURL}/users?email=${email}&password=${password}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.jsonURL, user);
  }

  //Metodos de Movies
  getMovies(): Observable<any> {
    return this.http.get<MovieResponse>(this.baseUrl.concat(this.trending, this.apiKey)).pipe(
      map((res) => res.results)
    );
  }
  
  getMoviesxGenero(numberPage: number, idGenero: string): Observable<any> {
    return this.http.get<MovieResponse>(this.baseUrl.concat(this.filtrar, this.page, numberPage.toString(), this.genero, idGenero, this.apiKey)).pipe(
      map((res) => res.results)
    );
  }

  /*addMovieToFavorite(createPerson: Movie): Observable<boolean> {
    const url = `${this.baseURL}/persons`;
    return this.http.post<boolean>(url, createPerson);
  }*/

  editPerson(id: number, updatePerson: Movie): Observable<boolean> {
    const url = ${this.baseURL}/persons/${id};
    return this.http.put<boolean>(url, updatePerson);
  }

 /* deleteMovieToFavorite(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseURL}/persons/${id}`)
    .pipe(
      map(resp => true), // Si sale bien retorna true. Recibir un response significa que salio bien
      catchError(error => of(false)) // Si hay algun error en la solicitud me regresa falso
    );
  }*/
  
}