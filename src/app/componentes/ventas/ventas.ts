import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas {}
