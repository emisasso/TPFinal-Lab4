import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  userLoged: User[] = [];
  userId: number = 0;
  userData: any; // Objeto que contendrá los datos del usuario
  userLogedId: string | null = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      this.userId = idParam !== null ? +idParam : 0; // Obtén el ID del usuario de los parámetros de la ruta
      this.getUserData();
      let authLocalStore: string | null = localStorage.getItem('token');
      this.userLogedId = this.apiService.localStoreNull(authLocalStore);
    this.getLogedUserUserPage(this.userLogedId);
    });
  }

  getUserData(): void {
    this.apiService.getUser(this.userId).subscribe(data => {
      this.userData = data;
    });
  }

  updateUsername(newUsername: string): void {
    this.userData.username = newUsername;
    this.apiService.updateUser(this.userId, this.userData).subscribe();
  }

  updatePassword(newPassword: string): void {
    this.apiService.updatePassword(this.userId, newPassword).subscribe();
  }

  navigateToFavorites(): void {
    this.router.navigate(['/user/favorites']);
  }
  getLogedUserUserPage(id: string | null){
    this.apiService.getUserToAuthById(id).subscribe((resp: User[]) => {
      this.userLoged = resp;
    })
  }

}