import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-panel.html',
  styleUrl: './section-panel.css',
})
export class SectionPanel {
  @Input() num = '01';
  @Input() title = '';
  @Input() link = '';
  @Input() linkLabel = '';
  @Input() badge: number | null = null;
  open = false;
  toggle() { this.open = !this.open; }
}
