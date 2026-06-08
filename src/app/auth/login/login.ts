import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';

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

  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login com sucesso!', response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro ao fazer login:', err);
        alert('Falha na autenticação. Verifique suas credenciais!');
      }
    });
  }

}
