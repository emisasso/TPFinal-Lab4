import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  valorCompartido: boolean | undefined;

  constructor(private authService: AuthServiceService, private router: Router){
    this.valorCompartido= this.authService.getVariable();
  }

  public goToLogin(){

    this.router.navigate(['/login']);
  }

  public goToRegister(){

    this.router.navigate(['/register']);
  }
 

}
