import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Input() isUser: boolean = false;

  ngOnInit(): void {
  }

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

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public goToUserPage(){
    this.router.navigate(['/user'])
  }

}
