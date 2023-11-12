import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Movie } from 'src/app/core/models';



@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentComponent implements OnInit{ 

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
 
  public numberPage: number = 1;
  public idGenre: string = '';
  genreSeleccionado: string = '';
  constructor(private apiService: ApiService){ }

 ngOnInit(): void { 

  this.apiService.getMovies().subscribe(res =>{
    this.movies = res;
    
 })
 
 
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

}
}

}
