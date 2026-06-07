import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  registerData = {
    name: '',
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Dados de registro enviados:', this.registerData);
    // Chamar API
  }

}
