import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private http = inject(HttpClient);

  open: Record<string, boolean> = {
    principal: true,
    gestion:   false,
    analisis:  false,
    sistema:   false,
  };

  sidebarOpen = false;
  toggleSidebar() { this.sidebarOpen = !this.sidebarOpen; }
  closeSidebar()  { this.sidebarOpen = false; }

  toggle(section: string) {
    this.open[section] = !this.open[section];
  }

  ngOnInit() {
    this.http.get(`${environment.apiUrl}/dashboard/kpis`).pipe(catchError(() => of(null))).subscribe();
  }
}
