import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/app/core/interface';
import { Movie } from 'src/app/core/models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponentComponent implements OnInit{ 

  imageUrl: string = 'https://image.tmdb.org/t/p/w500';
  movies: IMovie[] = [];
 
  constructor(private apiService: ApiService){ }

 ngOnInit(): void { 

  this.apiService.getMovies().subscribe(res =>{
    this.movies = res;
 })
}
}
