import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  loginData = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Tentativa de login com:', this.loginData);
    // Chamar API
  }

}
