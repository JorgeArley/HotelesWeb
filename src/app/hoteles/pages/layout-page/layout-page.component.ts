import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Hoteles', icon: 'label', url: './list' },
    { label: 'Crear Hotel', icon: 'add', url: './new-hotel' },
    { label: 'Buscar Reserva', icon: 'search', url: './search' },
  ];

  constructor(private authService: AuthService,
              private router: Router) {}

  get user():User | undefined {
    return this.authService.currentUser;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
