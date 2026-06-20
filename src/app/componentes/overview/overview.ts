import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewHeader } from '../overview-header/overview-header';
import { QuickActions } from '../quick-actions/quick-actions';
import { KpiCard } from '../kpi-card/kpi-card';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, OverviewHeader, QuickActions, KpiCard, SectionPanel],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview {}
