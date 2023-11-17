import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Movie, User } from 'src/app/core/models';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentComponent implements OnInit{ 

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  esFavorita: boolean = false;
  public numberPage: number = 1;
  public idGenre: string = '';
  genreSeleccionado: string = '';
  userLogedId: string | null = '';
  userLoged: User[] = [];
  array: number[] = [];
  arrayActualizado: number[] = [];


  constructor(private apiService: ApiService){ }

  async ngOnInit() {
    this.apiService.getMovies().subscribe(res =>{
      this.movies = res;})
    let authLocalStore: string | null = localStorage.getItem('token');
    this.userLogedId = this.apiService.localStoreNull(authLocalStore);
    this.getLogedUserUserPage(this.userLogedId);

    try {
      (await this.apiService.getFavoritesAsycn(1)).forEach(element => {
        this.arrayActualizado.push(element);
      });
      console.log('Favoritos obtenidos:', this.array);
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
     }
  console.log(this.arrayActualizado);
  this.array = this.arrayActualizado;

  }

 getMoviesxGenre(pagina: number, genero: string): void{
   if(this.idGenre != genero){
    this.numberPage = 1;
  }
  this.idGenre = genero;
  this.apiService.getMoviesxGenero(pagina, genero).subscribe(res =>{
    this.movies = res;
    this.genreSeleccionado = genero;
 
})
}

nextPage(): void{
  this.numberPage = this.numberPage +1;
  this.getMoviesxGenre(this.numberPage,this.idGenre)
}

PreviousPage(): void{
  if(this.numberPage>1){
  this.numberPage = this.numberPage - 1;
  this.getMoviesxGenre(this.numberPage,this.idGenre)
}}

isFavorite(idMovie: number){
  if(this.array.includes(idMovie)){
    console.log("entra en el true en isFavorite");
    return true;
  }else{
    console.log("entra en el false en isFavorite");

    return false;
  }
}

getLogedUserUserPage(id: string | null){
  this.apiService.getUserToAuthById(id).subscribe((resp: User[]) => {
    this.userLoged = resp;
  })
}

buttonFavorite(idUser: number, idMovie: number){
  if(this.isFavorite(idMovie)){
    this.array = this.array.filter(item => item !== idMovie);
    this.apiService.deleteFavorite(idUser, idMovie, this.array);
  }else{
    this.array.push(idMovie);
    this.apiService.addFavorite(idUser, idMovie, this.array);
  }
  console.log(this.arrayActualizado);
}

}