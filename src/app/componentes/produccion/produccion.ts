import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionPanel } from '../section-panel/section-panel';

@Component({
  selector: 'app-produccion',
  standalone: true,
  imports: [CommonModule, SectionPanel],
  templateUrl: './produccion.html',
  styleUrl: './produccion.css',
})
export class Produccion {}
