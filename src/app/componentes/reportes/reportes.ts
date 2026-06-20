import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {}
