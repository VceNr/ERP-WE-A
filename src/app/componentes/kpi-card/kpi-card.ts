import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.html',
  styleUrl: './kpi-card.css',
})
export class KpiCard {
  @Input() label = '';
  @Input() value = '';
  @Input() delta = '';
  @Input() deltaDir: 'up' | 'down' = 'up';
  @Input() compare = '';
  @Input() color: 'blue' | 'green' | 'amber' | 'teal' | 'red' = 'blue';
  @Input() sparkPath = '';
}
