import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth/auth';


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

  private authService = inject(Auth);
  private router = inject(Router);

  onSubmit() {
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('Registro realizado com sucesso!', response);
        
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao fazer registro:', err);
        alert('Falha no registro. Verifique seus dados!');
      }
    });
  }

}
