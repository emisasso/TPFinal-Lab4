import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthServiceService } from 'src/app/core/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  private emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService, private apiService: ApiService) { }

  ngOnInit() {
  }

  registro = {
    email: '',
    password: ''
  };

  onSubmit() {
    // Aquí puedes agregar la lógica para enviar los datos de registro al servidor
    console.log('Email: ' + this.registro.email);
    console.log('Contraseña: ' + this.registro.password);
    this.apiService.createUser(this.registro)
      .subscribe(response => {
        console.log('Usuario creado exitosamente', response);
        // Realiza cualquier otra acción necesaria después de la creación del usuario
      }, error => {
        console.error('Error al crear el usuario', error);
      }); 
  }
}
