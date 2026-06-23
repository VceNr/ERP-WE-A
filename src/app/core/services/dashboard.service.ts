import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { KpiData, FinancialSummary, RecentOrder, Alert, SystemStatus, RecentActivity } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/dashboard`;

  getKpis() { return this.http.get<KpiData[]>(`${this.base}/kpis`); }
  getFinancialSummary() { return this.http.get<FinancialSummary>(`${this.base}/financial-summary`); }
  getRecentOrders() { return this.http.get<RecentOrder[]>(`${this.base}/recent-orders`); }
  getAlerts() { return this.http.get<Alert[]>(`${this.base}/alerts`); }
  getSystemStatus() { return this.http.get<SystemStatus[]>(`${this.base}/system-status`); }
  getRecentActivity() { return this.http.get<RecentActivity[]>(`${this.base}/recent-activity`); }
}
