import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user: User = new User();

  constructor(private authService: AuthServiceService, private router: Router) {}

  public async checkAuth(){

    const check = this.authService.checkAuth(this.user.email, this.user.password);

    if(await check){
      this.authService.setVariable(true);
      this.router.navigate(['/home']);
    }
    else{
      alert("No existe el usuario");
    }
  }

  public navigateToRegister(){
    this.router.navigate(['/register']);
  }

}
