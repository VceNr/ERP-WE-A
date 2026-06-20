import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
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
}
