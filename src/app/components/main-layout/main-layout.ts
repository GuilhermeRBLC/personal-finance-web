import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService); 

  userName = '';

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || '';
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
