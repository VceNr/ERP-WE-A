import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario {}
