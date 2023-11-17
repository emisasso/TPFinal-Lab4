import { Component, OnInit } from '@angular/core';
import { Movie, User } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  constructor(private apiService: ApiService) { }

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: Movie[] = [];
  moviesActualizado: number[] = [];
  public user: User = new User();
 
  public numberPage: number = 1;

  async ngOnInit(){ 
    this.apiService.getMoviesById(this.user.favorites).subscribe(res =>{
      this.movies = res;
   })

   try {
    (await this.apiService.getFavoritesAsycn(1)).forEach(element => {
      this.moviesActualizado.push(element);
    });
    console.log('Favoritos obtenidos:', this.movies);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
   }
  }


  /*
  isFavorite(idMovie: number){
    if(this.movies.includes(idMovie)){
      console.log("entra en el true en isFavorite");
      return true;
    }else{
      console.log("entra en el false en isFavorite");
  
      return false;
    }
  }

  buttonFavorite(idUser: number, idMovie: number){
    if(this.isFavorite(idMovie)){
      this.movies = this.movies.filter(item => item !== idMovie);
      this.apiService.deleteFavorite(idUser, idMovie, this.movies);
    }else{
      this.movies.push(idMovie);
      this.apiService.addFavorite(idUser, idMovie, this.movies);
    }
    console.log(this.moviesActualizado);
  }
  */
}
