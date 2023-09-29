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
    { label: 'Buscar Hotel', icon: 'hotel', url: './new-booking' },
    { label: 'Buscar Reserva', icon: 'searchOff', url: './search' },
  ];

  public role = localStorage.getItem('role');
  
  constructor(private authService: AuthService,
              private router: Router) {}

  get user():User | undefined {
    return this.authService.currentUser;
  }

  ngOnInit(): void {
    if (this.role === 'admin') {
      this.sidebarItems.push({ label: 'Crear Hotel', icon: 'add', url: './new-hotel'}),
      this.sidebarItems.push({ label: 'Crear Habitacion', icon: 'meeting_room', url: './new-room'})
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }
}
